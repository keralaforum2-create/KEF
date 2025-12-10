import { Express } from "express";
import phonepeRoutes from "./phonepe";

export function registerPhonepeRoutes(app: Express) {
  app.use("/api/phonepe", phonepeRoutes);
}
