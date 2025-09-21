// src/services/customers.service.js
import * as customerModel from "@modules/users/models/customer.model.js";

export const listCustomers = async () => {
  return await customerModel.findAllActive();
};