// src/routes/clientes.routes.js
import { Router } from "express";
import * as controller from '@controllers/customers.controller.js';
import { asyncHandler } from '@utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(controller.list));

export default router;
