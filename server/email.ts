import SibApiV3Sdk from 'sib-api-v3-sdk';

const ADMIN_EMAIL = 'keralastartupfest@gmail.com';
const FROM_NAME = 'Kerala Startup Fest';
const FROM_EMAIL = 'no-reply@keralastartupfest.com';

// Initialize Brevo API client
function getBrevoClient() {
  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    console.error('❌ BREVO_API_KEY is NOT configured in environment variables');
    throw new Error('BREVO_API_KEY not configured');
  }
  
  console.log('✅ BREVO_API_KEY loaded successfully');
  
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKeyAuth = defaultClient.authentications['api-key'];
  apiKeyAuth.apiKey = apiKey;
  
  return new SibApiV3Sdk.TransactionalEmailsApi();
}

interface RegistrationData {
  id: string;
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  age: string;
  institution?: string | null;
  registrationType: string;
  contestName?: string | null;
  ticketCategory?: string | null;
  sessionName?: string | null;
  participantType?: string | null;
  schoolGrade?: string | null;
  collegeYear?: string | null;
  collegeCourse?: string | null;
  teamMember1Name?: string | null;
  teamMember2Name?: string | null;
  paymentScreenshot?: string | null;
  profilePhoto?: string | null;
  pitchStartupName?: string | null;
  pitchElevatorPitch?: string | null;
  pitchProblemStatement?: string | null;
  pitchProposedSolution?: string | null;
  pitchProductName?: string | null;
  pitchProductDescription?: string | null;
  pitchPricingModel?: string | null;
  pitchCostPerUnit?: string | null;
  pitchSellingPrice?: string | null;
  pitchProfitPerUnit?: string | null;
  pitchTotalCapitalRequired?: string | null;
  pitchRevenuePerUser?: string | null;
  pitchTargetCustomers?: string | null;
  pitchMarketSize?: string | null;
  pitchCompetitorAnalysis?: string | null;
  pitchRevenueModel?: string | null;
  pitchRevenueStreams?: string | null;
  pitchYear1Revenue?: string | null;
  pitchYear2Revenue?: string | null;
  pitchYear3Revenue?: string | null;
  pitchYear4Revenue?: string | null;
  pitchYear5Revenue?: string | null;
  pitchExpectedRoi?: string | null;
  pitchBreakevenPeriod?: string | null;
  pitchFeasibilityReasons?: string | null;
  pitchCurrentStage?: string | null;
  pitchSupportingFiles?: string | null;
  pitchDemoVideoLink?: string | null;
  pitchDeclarationConfirmed?: string | null;
}

function generateTicketEmailHtml(data: RegistrationData, ticketUrl: string): string {
  // Determine the registration type for the message
  let registrationTypeText = '';
  if (data.registrationType === 'contest') {
    registrationTypeText = `Contest (${data.contestName || 'Contest'})`;
  } else if (data.ticketCategory === 'platinum') {
    registrationTypeText = 'Platinum Pass';
  } else if (data.ticketCategory === 'gold') {
    registrationTypeText = 'Gold Pass';
  } else if (data.ticketCategory === 'silver') {
    registrationTypeText = 'Silver Pass';
  } else {
    registrationTypeText = 'Event Pass';
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Kerala Startup Fest 2026 Ticket</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #f97316 100%); border-radius: 16px; padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: bold;">Kerala Startup Fest</h1>
          <p style="margin: 0; font-size: 48px; font-weight: bold; color: #fbbf24;">2026</p>
          <p style="margin: 20px 0 0 0; font-size: 14px; opacity: 0.9;">January 07 & 08, 2026 | Aspin Courtyards, Calicut Beach</p>
        </div>
        
        <div style="background: white; border-radius: 16px; padding: 30px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear Startup Enthusiast,</p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for registering for the <strong>${registrationTypeText}</strong> of Kerala Startup Fest 2026, to be held on January 07 & 08 at Aspin Courtyards, Calicut Beach.
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Your registration has been successfully confirmed.
          </p>
          
          <div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
            <p style="margin: 0 0 5px 0; font-size: 12px; color: #666; text-transform: uppercase;">Your Ticket ID</p>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #dc2626; font-family: monospace;">${data.registrationId}</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="color: #666; font-size: 12px; text-transform: uppercase;">Ticket Date</span><br>
                <strong style="color: #333; font-size: 16px;">January 7 & 8, 2026</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="color: #666; font-size: 12px; text-transform: uppercase;">Venue</span><br>
                <strong style="color: #333; font-size: 16px;">Aspin Courtyards, Calicut</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="color: #666; font-size: 12px; text-transform: uppercase;">Name</span><br>
                <strong style="color: #333; font-size: 16px;">${data.fullName}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="color: #666; font-size: 12px; text-transform: uppercase;">Email</span><br>
                <strong style="color: #333; font-size: 16px;">${data.email}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="color: #666; font-size: 12px; text-transform: uppercase;">Phone</span><br>
                <strong style="color: #333; font-size: 16px;">${data.phone}</strong>
              </td>
            </tr>
            ${data.contestName ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="color: #666; font-size: 12px; text-transform: uppercase;">Contest</span><br>
                <strong style="color: #333; font-size: 16px;">${data.contestName}</strong>
              </td>
            </tr>
            ` : ''}
            ${data.institution ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="color: #666; font-size: 12px; text-transform: uppercase;">Institution</span><br>
                <strong style="color: #333; font-size: 16px;">${data.institution}</strong>
              </td>
            </tr>
            ` : ''}
            ${data.teamMember1Name || data.teamMember2Name ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="color: #666; font-size: 12px; text-transform: uppercase;">Team Members</span><br>
                <strong style="color: #333; font-size: 16px;">
                  ${data.teamMember1Name ? data.teamMember1Name : ''}
                  ${data.teamMember1Name && data.teamMember2Name ? ', ' : ''}
                  ${data.teamMember2Name ? data.teamMember2Name : ''}
                </strong>
              </td>
            </tr>
            ` : ''}
          </table>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${ticketUrl}" style="display: inline-block; background: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-bottom: 12px;">View Your Ticket</a>
          </div>
          
          <div style="text-align: center; margin: 15px 0;">
            <a href="${ticketUrl}?download=true" style="display: inline-block; background: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Download Ticket as PDF</a>
          </div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
            We will share the detailed schedule and delegate instructions shortly.
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
            For any queries, feel free to contact us.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #333;">
          <p style="margin: 0; font-weight: bold; font-size: 16px;">Kerala Startup Fest Team</p>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Kerala Economic Forum</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateAdminNotificationHtml(data: RegistrationData, ticketUrl?: string): string {
  const isPitchRoom = data.contestName === 'The Pitch Room';
  
  let pitchDetails = '';
  if (isPitchRoom) {
    pitchDetails = `
      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin-top: 20px;">
        <h3 style="color: #b45309; margin: 0 0 15px 0;">Pitch Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${data.pitchStartupName ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Startup Name:</strong> ${data.pitchStartupName}</td></tr>` : ''}
          ${data.pitchElevatorPitch ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Elevator Pitch:</strong> ${data.pitchElevatorPitch}</td></tr>` : ''}
          ${data.pitchProblemStatement ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Problem Statement:</strong> ${data.pitchProblemStatement}</td></tr>` : ''}
          ${data.pitchProposedSolution ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Proposed Solution:</strong> ${data.pitchProposedSolution}</td></tr>` : ''}
          ${data.pitchProductName ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Product Name:</strong> ${data.pitchProductName}</td></tr>` : ''}
          ${data.pitchProductDescription ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Product Description:</strong> ${data.pitchProductDescription}</td></tr>` : ''}
          ${data.pitchPricingModel ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Pricing Model:</strong> ${data.pitchPricingModel}</td></tr>` : ''}
          ${data.pitchCostPerUnit ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Cost Per Unit:</strong> ${data.pitchCostPerUnit}</td></tr>` : ''}
          ${data.pitchSellingPrice ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Selling Price:</strong> ${data.pitchSellingPrice}</td></tr>` : ''}
          ${data.pitchProfitPerUnit ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Profit Per Unit:</strong> ${data.pitchProfitPerUnit}</td></tr>` : ''}
          ${data.pitchTargetCustomers ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Target Customers:</strong> ${data.pitchTargetCustomers}</td></tr>` : ''}
          ${data.pitchMarketSize ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Market Size:</strong> ${data.pitchMarketSize}</td></tr>` : ''}
          ${data.pitchCompetitorAnalysis ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Competitor Analysis:</strong> ${data.pitchCompetitorAnalysis}</td></tr>` : ''}
          ${data.pitchRevenueModel ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Revenue Model:</strong> ${data.pitchRevenueModel}</td></tr>` : ''}
          ${data.pitchRevenueStreams ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Revenue Streams:</strong> ${data.pitchRevenueStreams}</td></tr>` : ''}
          ${data.pitchYear1Revenue ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Year 1 Revenue:</strong> ${data.pitchYear1Revenue}</td></tr>` : ''}
          ${data.pitchYear2Revenue ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Year 2 Revenue:</strong> ${data.pitchYear2Revenue}</td></tr>` : ''}
          ${data.pitchYear3Revenue ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Year 3 Revenue:</strong> ${data.pitchYear3Revenue}</td></tr>` : ''}
          ${data.pitchYear4Revenue ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Year 4 Revenue:</strong> ${data.pitchYear4Revenue}</td></tr>` : ''}
          ${data.pitchYear5Revenue ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Year 5 Revenue:</strong> ${data.pitchYear5Revenue}</td></tr>` : ''}
          ${data.pitchExpectedRoi ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Expected ROI:</strong> ${data.pitchExpectedRoi}</td></tr>` : ''}
          ${data.pitchBreakevenPeriod ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Breakeven Period:</strong> ${data.pitchBreakevenPeriod}</td></tr>` : ''}
          ${data.pitchFeasibilityReasons ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Feasibility Reasons:</strong> ${data.pitchFeasibilityReasons}</td></tr>` : ''}
          ${data.pitchCurrentStage ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Current Stage:</strong> ${data.pitchCurrentStage}</td></tr>` : ''}
          ${data.pitchDemoVideoLink ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Demo Video:</strong> <a href="${data.pitchDemoVideoLink}">${data.pitchDemoVideoLink}</a></td></tr>` : ''}
        </table>
      </div>
    `;
  }
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Registration - Kerala Startup Fest 2026</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); border-radius: 16px; padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px; font-weight: bold;">New Registration Received</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Kerala Startup Fest 2026</p>
        </div>
        
        <div style="background: white; border-radius: 16px; padding: 30px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 15px; text-align: center; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; color: #166534;">
              <strong>Registration ID:</strong> ${data.registrationId}
            </p>
          </div>
          
          <h3 style="color: #333; margin: 0 0 15px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Registrant Information</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Full Name:</strong> ${data.fullName}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong> ${data.email}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong> ${data.phone}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Age:</strong> ${data.age}</td></tr>
            ${data.institution ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Institution:</strong> ${data.institution}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Registration Type:</strong> ${data.registrationType === 'expert-session' ? 'Expert Session' : data.registrationType === 'contest' ? 'Contest' : 'Ticket'}</td></tr>
            ${data.ticketCategory ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Ticket Category:</strong> <span style="text-transform: capitalize; font-weight: bold; color: ${data.ticketCategory === 'platinum' ? '#6b7280' : data.ticketCategory === 'gold' ? '#ca8a04' : '#9ca3af'};">${data.ticketCategory.toUpperCase()}</span></td></tr>` : ''}
            ${data.contestName ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Contest:</strong> ${data.contestName}</td></tr>` : ''}
            ${data.participantType ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Participant Type:</strong> ${data.participantType}</td></tr>` : ''}
            ${data.schoolGrade ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>School Grade:</strong> ${data.schoolGrade}</td></tr>` : ''}
            ${data.collegeYear ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>College Year:</strong> ${data.collegeYear}</td></tr>` : ''}
            ${data.collegeCourse ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>College Course:</strong> ${data.collegeCourse}</td></tr>` : ''}
            ${data.teamMember1Name ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Team Member 1:</strong> ${data.teamMember1Name}</td></tr>` : ''}
            ${data.teamMember2Name ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Team Member 2:</strong> ${data.teamMember2Name}</td></tr>` : ''}
          </table>
          
          ${ticketUrl ? `
          <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; margin-top: 20px; text-align: center;">
            <h3 style="color: #1e40af; margin: 0 0 15px 0;">Ticket Access</h3>
            <p style="margin: 0 0 15px 0; color: #1e40af; font-size: 14px;">View or download the registrant's ticket:</p>
            <div style="display: inline-block;">
              <a href="${ticketUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; margin-right: 10px;">View Ticket</a>
              <a href="${ticketUrl}?download=true" style="display: inline-block; background: #16a34a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Download PDF</a>
            </div>
          </div>
          ` : ''}
          
          ${pitchDetails}
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p style="margin: 0;">This is an automated notification from Kerala Startup Fest 2026</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generatePitchIdeaEmailHtml(data: RegistrationData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pitch Start Idea - Kerala Startup Fest 2026</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); border-radius: 16px; padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 36px; font-weight: bold;">PITCH START IDEA</h1>
          <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">New Pitch Room Submission</p>
        </div>
        
        <div style="background: white; border-radius: 16px; padding: 30px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: #faf5ff; border: 2px solid #c4b5fd; border-radius: 12px; padding: 15px; text-align: center; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; color: #6b21a8;">
              <strong>Registration ID:</strong> ${data.registrationId}
            </p>
          </div>
          
          <h3 style="color: #7c3aed; margin: 0 0 15px 0; border-bottom: 2px solid #e9d5ff; padding-bottom: 10px;">Participant Information</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3e8ff;"><strong>Full Name:</strong> ${data.fullName}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3e8ff;"><strong>Email:</strong> ${data.email}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3e8ff;"><strong>Phone:</strong> ${data.phone}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3e8ff;"><strong>Age:</strong> ${data.age}</td></tr>
            ${data.institution ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f3e8ff;"><strong>Institution:</strong> ${data.institution}</td></tr>` : ''}
            ${data.teamMember1Name ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f3e8ff;"><strong>Team Member 1:</strong> ${data.teamMember1Name}</td></tr>` : ''}
            ${data.teamMember2Name ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f3e8ff;"><strong>Team Member 2:</strong> ${data.teamMember2Name}</td></tr>` : ''}
          </table>
          
          <h3 style="color: #7c3aed; margin: 20px 0 15px 0; border-bottom: 2px solid #e9d5ff; padding-bottom: 10px;">Startup Idea Details</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            ${data.pitchStartupName ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Startup Name:</strong><br>${data.pitchStartupName}</td></tr>` : ''}
            ${data.pitchElevatorPitch ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Elevator Pitch:</strong><br>${data.pitchElevatorPitch}</td></tr>` : ''}
            ${data.pitchProblemStatement ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Problem Statement:</strong><br>${data.pitchProblemStatement}</td></tr>` : ''}
            ${data.pitchProposedSolution ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Proposed Solution:</strong><br>${data.pitchProposedSolution}</td></tr>` : ''}
            ${data.pitchProductName ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Product Name:</strong><br>${data.pitchProductName}</td></tr>` : ''}
            ${data.pitchProductDescription ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Product Description:</strong><br>${data.pitchProductDescription}</td></tr>` : ''}
            ${data.pitchPricingModel ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Pricing Model:</strong><br>${data.pitchPricingModel}</td></tr>` : ''}
            ${data.pitchCostPerUnit ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Cost Per Unit:</strong><br>${data.pitchCostPerUnit}</td></tr>` : ''}
            ${data.pitchSellingPrice ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Selling Price:</strong><br>${data.pitchSellingPrice}</td></tr>` : ''}
            ${data.pitchProfitPerUnit ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Profit Per Unit:</strong><br>${data.pitchProfitPerUnit}</td></tr>` : ''}
            ${data.pitchTotalCapitalRequired ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Total Capital Required for Setting Up:</strong><br>${data.pitchTotalCapitalRequired}</td></tr>` : ''}
            ${data.pitchRevenuePerUser ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Revenue Per User/Month:</strong><br>${data.pitchRevenuePerUser}</td></tr>` : ''}
            ${data.pitchTargetCustomers ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Target Customers:</strong><br>${data.pitchTargetCustomers}</td></tr>` : ''}
            ${data.pitchMarketSize ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Market Size:</strong><br>${data.pitchMarketSize}</td></tr>` : ''}
            ${data.pitchCompetitorAnalysis ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Competitor Analysis:</strong><br>${data.pitchCompetitorAnalysis}</td></tr>` : ''}
            ${data.pitchRevenueModel ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Revenue Model:</strong><br>${data.pitchRevenueModel}</td></tr>` : ''}
            ${data.pitchRevenueStreams ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Revenue Streams:</strong><br>${data.pitchRevenueStreams}</td></tr>` : ''}
            ${data.pitchYear1Revenue ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Year 1 Revenue:</strong><br>${data.pitchYear1Revenue}</td></tr>` : ''}
            ${data.pitchYear2Revenue ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Year 2 Revenue:</strong><br>${data.pitchYear2Revenue}</td></tr>` : ''}
            ${data.pitchYear3Revenue ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Year 3 Revenue:</strong><br>${data.pitchYear3Revenue}</td></tr>` : ''}
            ${data.pitchYear4Revenue ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Year 4 Revenue:</strong><br>${data.pitchYear4Revenue}</td></tr>` : ''}
            ${data.pitchYear5Revenue ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Year 5 Revenue:</strong><br>${data.pitchYear5Revenue}</td></tr>` : ''}
            ${data.pitchExpectedRoi ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Expected ROI:</strong><br>${data.pitchExpectedRoi}</td></tr>` : ''}
            ${data.pitchBreakevenPeriod ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Breakeven Period:</strong><br>${data.pitchBreakevenPeriod}</td></tr>` : ''}
            ${data.pitchFeasibilityReasons ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Feasibility Reasons:</strong><br>${data.pitchFeasibilityReasons}</td></tr>` : ''}
            ${data.pitchCurrentStage ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Current Stage:</strong><br>${data.pitchCurrentStage}</td></tr>` : ''}
            ${data.pitchDemoVideoLink ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Demo Video:</strong><br><a href="${data.pitchDemoVideoLink}" style="color: #7c3aed;">${data.pitchDemoVideoLink}</a></td></tr>` : ''}
          </table>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p style="margin: 0;">This is an automated notification from Kerala Startup Fest 2026</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateSpeakerConfirmationEmailHtml(data: RegistrationData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Podcast Speaker Registration - Kerala Startup Fest 2026</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); border-radius: 16px; padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: bold;">Podcast Speaker</h1>
          <p style="margin: 0; font-size: 18px; font-weight: bold;">Registration Confirmed</p>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Kerala Startup Fest 2026</p>
        </div>
        
        <div style="background: white; border-radius: 16px; padding: 30px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Dear ${data.fullName},</p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for applying to speak at the <strong>Kerala Startup Fest 2026 Podcast Series</strong>!
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Your podcast speaker registration has been successfully received and confirmed. We are excited about your participation and look forward to featuring your story.
          </p>
          
          <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
            <p style="margin: 0 0 5px 0; font-size: 12px; color: #166534; text-transform: uppercase;">Your Registration ID</p>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #059669; font-family: monospace;">${data.registrationId}</p>
          </div>
          
          <div style="background: #f3f4f6; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #059669; margin: 0 0 15px 0;">Next Steps</h3>
            <ul style="margin: 0; padding-left: 20px; color: #333;">
              <li style="margin: 8px 0;">Our team will review your application</li>
              <li style="margin: 8px 0;">We will contact you within 7 days with the outcome</li>
              <li style="margin: 8px 0;">Selected speakers will receive interview details and podcast schedule</li>
              <li style="margin: 8px 0;">Keep your registration ID handy for reference</li>
            </ul>
          </div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
            If you have any questions, feel free to reach out to us at <strong>podcast@keralastartupfest.com</strong>
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
            We look forward to sharing your entrepreneurial journey!
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #333;">
          <p style="margin: 0; font-weight: bold; font-size: 16px;">Kerala Startup Fest Team</p>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Celebrating Innovation & Entrepreneurship</p>
          <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">January 7-8, 2026 | Aspin Courtyards, Calicut Beach</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendRegistrationEmail(data: RegistrationData, ticketUrl: string): Promise<{ success: boolean; error?: string }> {
  try {
    const api = getBrevoClient();
    
    console.log(`📧 Sending registration email to: ${data.email}`);
    
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL };
    sendSmtpEmail.to = [{ email: data.email, name: data.fullName }];
    sendSmtpEmail.cc = [{ email: ADMIN_EMAIL }];
    sendSmtpEmail.subject = `Your Kerala Startup Fest 2026 Registration Confirmed`;
    sendSmtpEmail.htmlContent = generateTicketEmailHtml(data, ticketUrl);
    
    await api.sendTransacEmail(sendSmtpEmail);
    
    console.log(`✅ Registration email sent successfully to ${data.email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending registration email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send registration email' 
    };
  }
}

export async function sendAdminNotificationEmail(data: RegistrationData, ticketUrl?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const api = getBrevoClient();
    
    console.log(`📧 Sending admin notification email for registration: ${data.registrationId}`);
    
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL };
    sendSmtpEmail.to = [{ email: ADMIN_EMAIL }];
    sendSmtpEmail.subject = `New Registration: ${data.fullName} - ${data.registrationId}`;
    sendSmtpEmail.htmlContent = generateAdminNotificationHtml(data, ticketUrl);
    
    await api.sendTransacEmail(sendSmtpEmail);
    
    if (data.contestName === 'The Pitch Room') {
      const pitchSendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      pitchSendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL };
      pitchSendSmtpEmail.to = [{ email: ADMIN_EMAIL }];
      pitchSendSmtpEmail.subject = `Pitch Room Submission: ${data.pitchStartupName || data.fullName}`;
      pitchSendSmtpEmail.htmlContent = generatePitchIdeaEmailHtml(data);
      
      await api.sendTransacEmail(pitchSendSmtpEmail);
    }
    
    console.log(`✅ Admin notification email sent successfully`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending admin notification email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send admin notification email' 
    };
  }
}

export async function sendSpeakerConfirmationEmail(data: RegistrationData): Promise<{ success: boolean; error?: string }> {
  try {
    const api = getBrevoClient();
    
    console.log(`📧 Sending speaker confirmation email to: ${data.email}`);
    
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL };
    sendSmtpEmail.to = [{ email: data.email, name: data.fullName }];
    sendSmtpEmail.subject = `Podcast Speaker Registration Confirmed - Kerala Startup Fest 2026`;
    sendSmtpEmail.htmlContent = generateSpeakerConfirmationEmailHtml(data);
    
    await api.sendTransacEmail(sendSmtpEmail);
    
    console.log(`✅ Speaker confirmation email sent successfully to ${data.email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending speaker confirmation email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send speaker confirmation email' 
    };
  }
}

export async function sendSpeakerApprovalEmail(founderName: string, email: string, startupName: string): Promise<{ success: boolean; error?: string }> {
  try {
    const api = getBrevoClient();
    
    console.log(`📧 Sending speaker approval email to: ${email}`);
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Speaker Application Approved - Kerala Startup Fest 2026</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 16px; padding: 40px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 32px; font-weight: bold;">APPROVED</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px;">Your Speaker Application is Approved!</p>
          </div>
          
          <div style="background: white; border-radius: 16px; padding: 30px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Dear <strong>${founderName}</strong>,
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Congratulations! Your podcast speaker application for <strong>${startupName}</strong> has been <strong style="color: #10b981;">APPROVED</strong> by Kerala Startup Fest 2026.
            </p>
            
            <div style="background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #059669; margin: 0 0 15px 0;">Next Steps</h3>
              <ul style="color: #333; margin: 0; padding-left: 20px;">
                <li style="margin: 8px 0;">We will contact you with podcast recording details</li>
                <li style="margin: 8px 0;">Prepare your key insights and story to share</li>
                <li style="margin: 8px 0;">Join us at Kerala Startup Fest 2026 on January 7-8</li>
              </ul>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
              For any questions, reach out to us at <strong>podcast@keralastartupfest.com</strong>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p style="margin: 0;">This is an automated notification from Kerala Startup Fest 2026</p>
            <p style="margin: 5px 0 0 0;">January 7-8, 2026 | Aspin Courtyards, Calicut Beach</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL };
    sendSmtpEmail.to = [{ email: email, name: founderName }];
    sendSmtpEmail.subject = `Your Podcast Speaker Application is Approved - Kerala Startup Fest 2026`;
    sendSmtpEmail.htmlContent = htmlContent;
    
    await api.sendTransacEmail(sendSmtpEmail);
    
    console.log(`✅ Speaker approval email sent successfully to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending speaker approval email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send speaker approval email' 
    };
  }
}
