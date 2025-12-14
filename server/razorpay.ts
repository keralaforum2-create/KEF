import Razorpay from 'razorpay';
import crypto from 'crypto';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

console.log('Razorpay Key ID configured:', RAZORPAY_KEY_ID ? 'Yes' : 'No');

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export interface RazorpayOrderParams {
  amount: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  success: boolean;
  order?: {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
  };
  keyId?: string;
  error?: string;
}

export interface RazorpayVerifyParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayVerifyResponse {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  error?: string;
}

export async function createRazorpayOrder(params: RazorpayOrderParams): Promise<RazorpayOrderResponse> {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay credentials not configured');
    }

    const options = {
      amount: params.amount * 100,
      currency: params.currency || 'INR',
      receipt: params.receipt,
      notes: params.notes || {},
    };

    const order = await razorpay.orders.create(options);

    return {
      success: true,
      order: {
        id: order.id,
        amount: Number(order.amount),
        currency: order.currency,
        receipt: order.receipt || params.receipt,
      },
      keyId: RAZORPAY_KEY_ID,
    };
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order',
    };
  }
}

export function verifyRazorpayPayment(params: RazorpayVerifyParams): RazorpayVerifyResponse {
  try {
    if (!RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay key secret not configured');
    }

    const body = params.razorpay_order_id + '|' + params.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === params.razorpay_signature;

    if (isValid) {
      return {
        success: true,
        paymentId: params.razorpay_payment_id,
        orderId: params.razorpay_order_id,
      };
    } else {
      return {
        success: false,
        error: 'Invalid payment signature',
      };
    }
  } catch (error) {
    console.error('Razorpay verification failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment verification failed',
    };
  }
}

export async function fetchRazorpayPayment(paymentId: string) {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return {
      success: true,
      payment,
    };
  } catch (error) {
    console.error('Failed to fetch payment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch payment',
    };
  }
}
