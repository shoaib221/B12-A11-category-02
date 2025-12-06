

import express from "express";
import { authRouter } from "./auth/controller.js";
import { requireAuth } from "./auth/middlewire.js";
import { testRouter } from "./test/controller.js";
import { productRouter } from "./products/controller.js";
import { pageRouter } from "./pagination/controller.js";
import { paymentRouter } from "./stripe/controller.js";
import { miscelRouter } from "./miscel/controller.js";
export const mainRouter = express.Router();




mainRouter.use("/auth", authRouter);
mainRouter.use("/test", testRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/page", pageRouter);
mainRouter.use("/payment", paymentRouter);
mainRouter.use("/miscel", miscelRouter);
mainRouter.all(/.*/, (req, res) => {
    res.status(404).json({ error: "Invalid route" })
})



// mainRouter.use( "/chat", chatRouter );




