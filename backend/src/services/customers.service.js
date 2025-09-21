// src/services/customers.service.js
import * as customerModel from '@models/customer.model.js';

export const listCustomers = async () => {
  return await customerModel.findAllActive();
};