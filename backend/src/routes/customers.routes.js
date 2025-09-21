// src/routes/clientes.routes.js
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {  
  res.json({ message: "Lista de clientes - funcionando!" });
});

export default router;
