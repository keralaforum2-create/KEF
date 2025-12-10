import crypto from 'crypto';
import axios from 'axios';

const PHONEPE_CLIENT_ID = process.env.PHONEPE_CLIENT_ID;
const PHONEPE_CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET;
const PHONEPE_ENVIRONMENT = process.env.PHONEPE_ENVIRONMENT || 'PRODUCTION';

if (!PHONEPE_CLIENT_ID || !PHONEPE_CLIENT_SECRET) {
  console.error('WARNING: PHONEPE_CLIENT_ID or PHONEPE_CLIENT_SECRET not set in environment variables');
}

// Production: https://api.phonepe.com/apis/pg
// Sandbox:    https://api-preprod.phonepe.com/apis/pg-sandbox
const PHONEPE_BASE_URL = PHONEPE_ENVIRONMENT === 'PRODUCTION' 
  ? 'https://api.phonepe.com/apis/pg'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

// Deployment URL for callbacks (no localhost)
const DEPLOYMENT_URL = process.env.DEPLOYMENT_URL || 'https://kef-e3hu.onrender.com';

const MERCHANT_ID = PHONEPE_CLIENT_ID;
const SALT_KEY = PHONEPE_CLIENT_SECRET;
const SALT_INDEX = '1';

console.log('PhonePe Environment:', PHONEPE_ENVIRONMENT);
console.log('PhonePe Base URL:', PHONEPE_BASE_URL);
console.log('Deployment URL:', DEPLOYMENT_URL);

interface PaymentInitiateParams {
  merchantTransactionId: string;
  amount: number;
  userId: string;
  userPhone: string;
  userName: string;
  redirectUrl: string;
  callbackUrl: string;
}

interface PaymentInitiateResponse {
  success: boolean;
  redirectUrl?: string;
  error?: string;
}

interface PaymentStatusResponse {
  success: boolean;
  status: string;
  transactionId?: string;
  amount?: number;
  error?: string;
}

function generateChecksum(payload: string, endpoint: string): string {
  const string = payload + endpoint + SALT_KEY;
  const sha256Hash = crypto.createHash('sha256').update(string).digest('hex');
  return sha256Hash + '###' + SALT_INDEX;
}

export async function initiatePayment(params: PaymentInitiateParams): Promise<PaymentInitiateResponse> {
  try {
    console.log('PhonePe initiation starting with baseUrl:', PHONEPE_BASE_URL);
    console.log('Redirect URL:', params.redirectUrl);
    console.log('Callback URL:', params.callbackUrl);
    
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: params.merchantTransactionId,
      merchantUserId: 'MUID' + params.userId.slice(0, 10),
      amount: params.amount * 100,
      redirectUrl: params.redirectUrl,
      redirectMode: 'POST',
      callbackUrl: params.callbackUrl,
      mobileNumber: params.userPhone.replace(/\D/g, '').slice(-10),
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const endpoint = '/pg/v1/pay';
    const checksum = generateChecksum(base64Payload, endpoint);

    console.log('Making request to:', `${PHONEPE_BASE_URL}${endpoint}`);

    const response = await axios.post(
      `${PHONEPE_BASE_URL}${endpoint}`,
      {
        request: base64Payload
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'Accept': 'application/json'
        },
        timeout: 30000
      }
    );

    console.log('PhonePe response:', JSON.stringify(response.data));

    if (response.data.success && response.data.data?.instrumentResponse?.redirectInfo?.url) {
      return {
        success: true,
        redirectUrl: response.data.data.instrumentResponse.redirectInfo.url
      };
    }

    return {
      success: false,
      error: response.data.message || 'Failed to initiate payment'
    };
  } catch (error: any) {
    console.error('PhonePe payment initiation error:', error.response?.data || error.message);
    console.error('Full error:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to initiate payment'
    };
  }
}

export async function checkPaymentStatus(merchantTransactionId: string): Promise<PaymentStatusResponse> {
  try {
    const endpoint = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;
    const string = endpoint + SALT_KEY;
    const sha256Hash = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256Hash + '###' + SALT_INDEX;

    console.log('Checking payment status at:', `${PHONEPE_BASE_URL}${endpoint}`);

    const response = await axios.get(
      `${PHONEPE_BASE_URL}${endpoint}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': MERCHANT_ID
        },
        timeout: 30000
      }
    );

    const data = response.data;
    console.log('Payment status response:', JSON.stringify(data));
    
    if (data.success && data.code === 'PAYMENT_SUCCESS') {
      return {
        success: true,
        status: 'SUCCESS',
        transactionId: data.data?.transactionId,
        amount: data.data?.amount ? data.data.amount / 100 : undefined
      };
    }

    return {
      success: false,
      status: data.code || 'PENDING',
      error: data.message
    };
  } catch (error: any) {
    console.error('PhonePe status check error:', error.response?.data || error.message);
    return {
      success: false,
      status: 'ERROR',
      error: error.response?.data?.message || error.message || 'Failed to check payment status'
    };
  }
}

export function verifyCallback(xVerify: string, response: any): boolean {
  try {
    const responseBase64 = Buffer.from(JSON.stringify(response)).toString('base64');
    const string = responseBase64 + SALT_KEY;
    const sha256Hash = crypto.createHash('sha256').update(string).digest('hex');
    const expectedChecksum = sha256Hash + '###' + SALT_INDEX;
    
    return xVerify === expectedChecksum;
  } catch (error) {
    console.error('Callback verification error:', error);
    return false;
  }
}
