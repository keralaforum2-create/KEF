import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

let connectionSettings: any;
let jwtClient: JWT | null = null;

function getServiceAccountCredentials(): { email: string; privateKey: string } | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  
  if (!email || !privateKey) {
    return null;
  }
  
  const formattedKey = privateKey.replace(/\\n/g, '\n');
  
  return { email, privateKey: formattedKey };
}

async function getJwtClient(): Promise<JWT> {
  const credentials = getServiceAccountCredentials();
  
  if (!credentials) {
    throw new Error('Google Service Account credentials not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY environment variables.');
  }
  
  if (!jwtClient) {
    jwtClient = new JWT({
      email: credentials.email,
      key: credentials.privateKey,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });
  }
  
  return jwtClient;
}

async function getReplitAccessToken(): Promise<string | null> {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY 
      ? 'repl ' + process.env.REPL_IDENTITY 
      : process.env.WEB_REPL_RENEWAL 
      ? 'depl ' + process.env.WEB_REPL_RENEWAL 
      : null;

    if (!hostname || !xReplitToken) {
      return null;
    }

    connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;
    return accessToken || null;
  } catch {
    return null;
  }
}

async function getAuthClient(): Promise<any> {
  const serviceAccountCreds = getServiceAccountCredentials();
  if (serviceAccountCreds) {
    console.log('Using Google Service Account authentication');
    return await getJwtClient();
  }
  
  const replitToken = await getReplitAccessToken();
  if (replitToken) {
    console.log('Using Replit connector authentication');
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: replitToken });
    return oauth2Client;
  }
  
  throw new Error('No Google authentication available. Either set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY environment variables, or connect Google Sheets via Replit.');
}

async function getGoogleSheetsClient() {
  const auth = await getAuthClient();
  return google.sheets({ version: 'v4', auth });
}

async function getDriveClient() {
  const auth = await getAuthClient();
  return google.drive({ version: 'v3', auth });
}

const SESSION_SHEET_NAME = 'KSF2026_Session_Registrations';
const CONTEST_SHEET_NAME = 'KSF2026_Contest_Registrations';

async function findOrCreateSpreadsheet(name: string, headers: string[]): Promise<string> {
  const drive = await getDriveClient();
  const sheets = await getGoogleSheetsClient();
  
  const response = await drive.files.list({
    q: `name='${name}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
    spaces: 'drive',
    fields: 'files(id, name)',
  });

  if (response.data.files && response.data.files.length > 0) {
    return response.data.files[0].id!;
  }

  const createResponse = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: name,
      },
      sheets: [
        {
          properties: {
            title: 'Registrations',
          },
        },
      ],
    },
  });

  const spreadsheetId = createResponse.data.spreadsheetId!;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Registrations!A1',
    valueInputOption: 'RAW',
    requestBody: {
      values: [headers],
    },
  });

  console.log(`Created new spreadsheet: ${name} (${spreadsheetId})`);
  return spreadsheetId;
}

export interface SessionRegistrationData {
  name: string;
  phone: string;
  email: string;
  category: string;
  paymentProofUrl: string;
}

export interface ContestRegistrationData {
  name: string;
  phone: string;
  email: string;
  contest: string;
  paymentProofUrl: string;
}

export async function addSessionRegistration(data: SessionRegistrationData, baseUrl: string): Promise<void> {
  try {
    const sheets = await getGoogleSheetsClient();
    const headers = ['NAME', 'PHONE NO', 'EMAIL', 'CATEGORY', 'PAYMENT PROOF'];
    const spreadsheetId = await findOrCreateSpreadsheet(SESSION_SHEET_NAME, headers);

    const fullPaymentUrl = data.paymentProofUrl ? `${baseUrl}${data.paymentProofUrl}` : '';
    const paymentCell = fullPaymentUrl ? `=HYPERLINK("${fullPaymentUrl}", "View Payment")` : 'Not uploaded';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Registrations!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.name,
          data.phone,
          data.email,
          data.category || 'Normal',
          paymentCell,
        ]],
      },
    });

    console.log(`Session registration added to Google Sheet: ${data.name}`);
  } catch (error) {
    console.error('Error adding session registration to Google Sheet:', error);
    throw error;
  }
}

export async function addContestRegistration(data: ContestRegistrationData, baseUrl: string): Promise<void> {
  try {
    const sheets = await getGoogleSheetsClient();
    const headers = ['NAME', 'PHONE NO', 'EMAIL', 'CONTEST', 'PAYMENT PROOF'];
    const spreadsheetId = await findOrCreateSpreadsheet(CONTEST_SHEET_NAME, headers);

    const fullPaymentUrl = data.paymentProofUrl ? `${baseUrl}${data.paymentProofUrl}` : '';
    const paymentCell = fullPaymentUrl ? `=HYPERLINK("${fullPaymentUrl}", "View Payment")` : 'Not uploaded';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Registrations!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.name,
          data.phone,
          data.email,
          data.contest,
          paymentCell,
        ]],
      },
    });

    console.log(`Contest registration added to Google Sheet: ${data.name}`);
  } catch (error) {
    console.error('Error adding contest registration to Google Sheet:', error);
    throw error;
  }
}
