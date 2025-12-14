import * as fs from "fs";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "" });

export interface PaymentVerificationResult {
  isValid: boolean;
  recipientName: string | null;
  amount: number | null;
  transactionId: string | null;
  paymentDate: string | null;
  senderName: string | null;
  confidence: number;
  reason: string;
}

export async function verifyPaymentScreenshot(
  imagePath: string,
  expectedAmount: number
): Promise<PaymentVerificationResult> {
  try {
    const fullPath = imagePath.startsWith('/') 
      ? imagePath.startsWith('/uploads/') 
        ? `${process.cwd()}${imagePath}` 
        : imagePath
      : `${process.cwd()}/${imagePath}`;
    
    if (!fs.existsSync(fullPath)) {
      return {
        isValid: false,
        recipientName: null,
        amount: null,
        transactionId: null,
        paymentDate: null,
        senderName: null,
        confidence: 0,
        reason: "Payment screenshot file not found"
      };
    }

    const imageBytes = fs.readFileSync(fullPath);
    const base64Image = imageBytes.toString("base64");
    
    const ext = fullPath.split('.').pop()?.toLowerCase() || 'jpeg';
    const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';

    const systemPrompt = `You are an expert payment verification system. Analyze the payment screenshot and extract the following information:

1. Check if this is a valid payment proof/receipt
2. Extract the recipient name (who the payment was made TO)
3. Extract the payment amount (in INR)
4. Extract the transaction ID if visible
5. Extract the payment date if visible
6. Extract the sender name (who made the payment)

IMPORTANT VALIDATION RULES:
- The payment MUST be made to "CALIPH WORLD FOUNDATION" or similar (case insensitive, partial match OK like "caliph world", "caliphworld", "caliph foundation")
- The UPI ID should contain "caliphworldfoundation" 
- The amount should match or be close to the expected amount: ${expectedAmount} INR
- The screenshot should look like a genuine payment confirmation from a banking app (ICICI, HDFC, SBI, PhonePe, Google Pay, Paytm, etc.)

Respond with JSON in this exact format:
{
  "isValid": boolean (true only if payment is to Caliph World Foundation and amount is correct),
  "recipientName": string or null,
  "amount": number or null,
  "transactionId": string or null,
  "paymentDate": string or null,
  "senderName": string or null,
  "confidence": number between 0 and 1,
  "reason": string explaining why valid or invalid
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            isValid: { type: "boolean" },
            recipientName: { type: "string", nullable: true },
            amount: { type: "number", nullable: true },
            transactionId: { type: "string", nullable: true },
            paymentDate: { type: "string", nullable: true },
            senderName: { type: "string", nullable: true },
            confidence: { type: "number" },
            reason: { type: "string" }
          },
          required: ["isValid", "confidence", "reason"]
        }
      },
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType
          }
        },
        `Analyze this payment screenshot and verify if it's a valid payment proof to Caliph World Foundation for approximately ${expectedAmount} INR.`
      ]
    });

    const rawJson = response.text;
    
    if (rawJson) {
      const result: PaymentVerificationResult = JSON.parse(rawJson);
      console.log("Payment verification result:", JSON.stringify(result, null, 2));
      return result;
    }
    
    return {
      isValid: false,
      recipientName: null,
      amount: null,
      transactionId: null,
      paymentDate: null,
      senderName: null,
      confidence: 0,
      reason: "Failed to analyze the payment screenshot"
    };
    
  } catch (error) {
    console.error("Payment verification error:", error);
    return {
      isValid: false,
      recipientName: null,
      amount: null,
      transactionId: null,
      paymentDate: null,
      senderName: null,
      confidence: 0,
      reason: `Verification failed: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}

export async function verifyBulkPaymentScreenshot(
  imagePath: string,
  totalExpectedAmount: number,
  registrationCount: number
): Promise<PaymentVerificationResult & { matchesTotal: boolean }> {
  const result = await verifyPaymentScreenshot(imagePath, totalExpectedAmount);
  
  const matchesTotal = result.amount !== null && 
    Math.abs(result.amount - totalExpectedAmount) <= totalExpectedAmount * 0.05;
  
  return {
    ...result,
    matchesTotal,
    reason: result.isValid 
      ? matchesTotal 
        ? `Valid payment for ${registrationCount} registration(s). Amount matches expected total of ₹${totalExpectedAmount}`
        : `Payment verified but amount (₹${result.amount}) doesn't match expected total (₹${totalExpectedAmount})`
      : result.reason
  };
}
