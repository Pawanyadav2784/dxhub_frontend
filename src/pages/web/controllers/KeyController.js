/**
 * KeyController.js - [CONTROLLER]
 * Orchestrates License Key transfers and batch inventory balances.
 */

import { KeyModel } from '../models/KeyModel';

export const KeyController = {
  fetchStats() {
    return KeyModel.getStats();
  },

  async allocateKeys({ fromRole, toRole, receiverName, quantity }) {
    const qty = parseInt(quantity, 10);
    if (!qty || qty <= 0) {
      return { success: false, error: 'Please enter a valid key quantity (minimum 1).' };
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    return KeyModel.allocateKeys(fromRole, toRole, receiverName, qty);
  }
};

