

import express from "express";
import { authRouter } from "./auth/controller.js";
import { requireAuth } from "./auth/middlewire.js";
import { paymentRouter } from "./stripe/controller.js";
import { scholarshipRouter } from "./scholar/controller.js";
export const mainRouter = express.Router();




mainRouter.use("/auth", authRouter);
mainRouter.use("/payment", paymentRouter);
mainRouter.use("/scholarship", scholarshipRouter);
mainRouter.all(/.*/, (req, res) => {
    res.status(404).json({ error: "Invalid route" })
})



// mainRouter.use( "/chat", chatRouter );




