import { Router } from "express";
import { initiatePayment, checkPaymentStatus } from "../server/phonepe";

const router = Router();

router.post("/pay", async (req, res) => {
  const { amount, userId, userPhone, userName } = req.body;

  const merchantTransactionId = "TXN" + Date.now();

  const redirectUrl = `${process.env.DEPLOYMENT_URL}/payment/success`;
  const callbackUrl = `${process.env.DEPLOYMENT_URL}/api/phonepe/callback`;

  const result = await initiatePayment({
    merchantTransactionId,
    amount,
    userId,
    userPhone,
    userName,
    redirectUrl,
    callbackUrl,
  });

  res.json(result);
});

router.get("/status/:id", async (req, res) => {
  const result = await checkPaymentStatus(req.params.id);
  res.json(result);
});

router.post("/callback", async (req, res) => {
  try {
    console.log("PhonePe callback received:", JSON.stringify(req.body));
    res.json({ success: true });
  } catch (error) {
    console.error("Error processing PhonePe callback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
