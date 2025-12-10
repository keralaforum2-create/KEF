import crypto from 'crypto';
import axios from 'axios';

const PHONEPE_CLIENT_ID = 'SU2512081840541100588125';
const PHONEPE_CLIENT_SECRET = '69816a38-67b3-47d9-9e5e-291eae89dccd';
const PHONEPE_BASE_URL = 'https://api.phonepe.com/apis/hermes';
const MERCHANT_ID = 'SU2512081840541100588125';
const SALT_KEY = '69816a38-67b3-47d9-9e5e-291eae89dccd';
const SALT_INDEX = '1';

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
        }
      }
    );

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

    const response = await axios.get(
      `${PHONEPE_BASE_URL}${endpoint}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': MERCHANT_ID
        }
      }
    );

    const data = response.data;
    
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
