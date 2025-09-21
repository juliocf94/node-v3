// src/controllers/customers.controller.js
import * as service from "@modules/users/services/customers.service.js";

export const list = async (req, res) => {
  const data = await service.listCustomers();
  res.json(data);
};

