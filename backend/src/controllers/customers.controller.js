// src/controllers/customers.controller.js
import * as service from '@services/customers.service.js';

export const list = async (req, res) => {
  const customers = await service.listCustomers();
  res.json({ data: customers });
};

