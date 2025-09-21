// src/routes/index.js
import { Router } from "express";
import customersRouter from "@modules/users/routes/customers.routes.js";

const router = Router();

router.use("/customers", customersRouter);

export default router;
