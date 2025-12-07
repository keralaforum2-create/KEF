import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
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

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

async function getDriveClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.drive({ version: 'v3', auth: oauth2Client });
}

const SESSION_SHEET_NAME = 'KSF2026_Session_Registrations';
const CONTEST_SHEET_NAME = 'KSF2026_Contest_Registrations';

async function findOrCreateSpreadsheet(name: string, headers: string[]): Promise<string> {
  const drive = await getDriveClient();
  const sheets = await getUncachableGoogleSheetClient();
  
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
    const sheets = await getUncachableGoogleSheetClient();
    const headers = ['NAME', 'PHONE NO', 'EMAIL', 'CATEGORY', 'PAYMENT PROOF'];
    const spreadsheetId = await findOrCreateSpreadsheet(SESSION_SHEET_NAME, headers);

    const paymentUrl = data.paymentProofUrl ? `${baseUrl}${data.paymentProofUrl}` : 'Not uploaded';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Registrations!A:E',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          data.name,
          data.phone,
          data.email,
          data.category || 'Normal',
          paymentUrl,
        ]],
      },
    });

    console.log(`Session registration added to Google Sheet: ${data.name}`);
  } catch (error) {
    console.error('Error adding session registration to Google Sheet:', error);
  }
}

export async function addContestRegistration(data: ContestRegistrationData, baseUrl: string): Promise<void> {
  try {
    const sheets = await getUncachableGoogleSheetClient();
    const headers = ['NAME', 'PHONE NO', 'EMAIL', 'CONTEST', 'PAYMENT PROOF'];
    const spreadsheetId = await findOrCreateSpreadsheet(CONTEST_SHEET_NAME, headers);

    const paymentUrl = data.paymentProofUrl ? `${baseUrl}${data.paymentProofUrl}` : 'Not uploaded';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Registrations!A:E',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          data.name,
          data.phone,
          data.email,
          data.contest,
          paymentUrl,
        ]],
      },
    });

    console.log(`Contest registration added to Google Sheet: ${data.name}`);
  } catch (error) {
    console.error('Error adding contest registration to Google Sheet:', error);
  }
}
