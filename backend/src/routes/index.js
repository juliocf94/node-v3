// src/routes/index.js
import { Router } from "express";
import clientesRoutes from "./clientes.routes.js";

const router = Router();

router.use("/clientes", clientesRoutes);

export default router;
