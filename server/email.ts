import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-development');

const ADMIN_EMAIL = 'keralastartupfest@gmail.com';
const FROM_EMAIL = 'Kerala Startup Fest <onboarding@resend.dev>';

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
  participantType?: string | null;
  schoolGrade?: string | null;
  collegeYear?: string | null;
  collegeCourse?: string | null;
  teamMember1Name?: string | null;
  teamMember2Name?: string | null;
  paymentScreenshot?: string | null;
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
  pitchCustomerAcquisitionCost?: string | null;
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
          <p style="margin: 20px 0 0 0; font-size: 14px; opacity: 0.9;">January 7-8, 2026 | Calicut Beach</p>
        </div>
        
        <div style="background: white; border-radius: 16px; padding: 30px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #dc2626; margin: 0 0 20px 0; text-align: center;">Your Event Ticket</h2>
          
          <div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 20px;">
            <p style="margin: 0 0 5px 0; font-size: 12px; color: #666; text-transform: uppercase;">Ticket ID</p>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #dc2626; font-family: monospace;">${data.registrationId}</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
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
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="color: #666; font-size: 12px; text-transform: uppercase;">Participation Type</span><br>
                <strong style="color: #333; font-size: 16px;">${data.registrationType === 'expert-session' ? 'Expert Session' : 'Contest'}</strong>
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
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${ticketUrl}" style="display: inline-block; background: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">View Your Ticket</a>
          </div>
          
          <p style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
            Click the button above to view and download your ticket with QR code
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p style="margin: 0;">Thank you for registering for Kerala Startup Fest 2026!</p>
          <p style="margin: 5px 0 0 0;">We look forward to seeing you there.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateAdminNotificationHtml(data: RegistrationData): string {
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
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Registration Type:</strong> ${data.registrationType === 'expert-session' ? 'Expert Session' : 'Contest'}</td></tr>
            ${data.contestName ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Contest:</strong> ${data.contestName}</td></tr>` : ''}
            ${data.participantType ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Participant Type:</strong> ${data.participantType}</td></tr>` : ''}
            ${data.schoolGrade ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>School Grade:</strong> ${data.schoolGrade}</td></tr>` : ''}
            ${data.collegeYear ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>College Year:</strong> ${data.collegeYear}</td></tr>` : ''}
            ${data.collegeCourse ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>College Course:</strong> ${data.collegeCourse}</td></tr>` : ''}
            ${data.teamMember1Name ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Team Member 1:</strong> ${data.teamMember1Name}</td></tr>` : ''}
            ${data.teamMember2Name ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Team Member 2:</strong> ${data.teamMember2Name}</td></tr>` : ''}
          </table>
          
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
            ${data.pitchCustomerAcquisitionCost ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Customer Acquisition Cost:</strong><br>${data.pitchCustomerAcquisitionCost}</td></tr>` : ''}
            ${data.pitchRevenuePerUser ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Revenue Per User:</strong><br>${data.pitchRevenuePerUser}</td></tr>` : ''}
            ${data.pitchTargetCustomers ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Target Customers:</strong><br>${data.pitchTargetCustomers}</td></tr>` : ''}
            ${data.pitchMarketSize ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Market Size:</strong><br>${data.pitchMarketSize}</td></tr>` : ''}
            ${data.pitchCompetitorAnalysis ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Competitor Analysis:</strong><br>${data.pitchCompetitorAnalysis}</td></tr>` : ''}
            ${data.pitchRevenueModel ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Revenue Model:</strong><br>${data.pitchRevenueModel}</td></tr>` : ''}
            ${data.pitchRevenueStreams ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Revenue Streams:</strong><br>${data.pitchRevenueStreams}</td></tr>` : ''}
            ${data.pitchYear1Revenue ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Year 1 Revenue Projection:</strong><br>${data.pitchYear1Revenue}</td></tr>` : ''}
            ${data.pitchYear2Revenue ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Year 2 Revenue Projection:</strong><br>${data.pitchYear2Revenue}</td></tr>` : ''}
            ${data.pitchYear3Revenue ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Year 3 Revenue Projection:</strong><br>${data.pitchYear3Revenue}</td></tr>` : ''}
            ${data.pitchYear4Revenue ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Year 4 Revenue Projection:</strong><br>${data.pitchYear4Revenue}</td></tr>` : ''}
            ${data.pitchYear5Revenue ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Year 5 Revenue Projection:</strong><br>${data.pitchYear5Revenue}</td></tr>` : ''}
            ${data.pitchExpectedRoi ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Expected ROI:</strong><br>${data.pitchExpectedRoi}</td></tr>` : ''}
            ${data.pitchBreakevenPeriod ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Breakeven Period:</strong><br>${data.pitchBreakevenPeriod}</td></tr>` : ''}
            ${data.pitchFeasibilityReasons ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Feasibility Reasons:</strong><br>${data.pitchFeasibilityReasons}</td></tr>` : ''}
            ${data.pitchCurrentStage ? `<tr><td style="padding: 10px; background: white; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Current Stage:</strong><br>${data.pitchCurrentStage}</td></tr>` : ''}
            ${data.pitchDemoVideoLink ? `<tr><td style="padding: 10px; background: #faf5ff; border-bottom: 1px solid #e9d5ff;"><strong style="color: #7c3aed;">Demo Video Link:</strong><br><a href="${data.pitchDemoVideoLink}" style="color: #7c3aed;">${data.pitchDemoVideoLink}</a></td></tr>` : ''}
          </table>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
          <p style="margin: 0;">This is an automated Pitch Room submission notification</p>
          <p style="margin: 5px 0 0 0;">Kerala Startup Fest 2026</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendRegistrationEmails(data: RegistrationData, baseUrl: string): Promise<{ success: boolean; error?: string }> {
  try {
    const ticketUrl = `${baseUrl}/ticket/${data.registrationId}`;
    const isPitchRoom = data.contestName === 'The Pitch Room';
    
    const emailPromises: Promise<any>[] = [];
    
    emailPromises.push(
      resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: `Your Kerala Startup Fest 2026 Ticket - ${data.registrationId}`,
        html: generateTicketEmailHtml(data, ticketUrl),
      })
    );
    
    emailPromises.push(
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Registration: ${data.fullName} - ${data.registrationId}`,
        html: generateAdminNotificationHtml(data),
      })
    );
    
    if (isPitchRoom) {
      emailPromises.push(
        resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `PITCH START IDEA: ${data.pitchStartupName || data.fullName} - ${data.registrationId}`,
          html: generatePitchIdeaEmailHtml(data),
        })
      );
    }
    
    await Promise.all(emailPromises);
    
    console.log(`Emails sent successfully for registration ${data.registrationId}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending registration emails:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send emails' 
    };
  }
}
