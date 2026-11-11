/**
 * KeyModel.js - [MODEL]
 * Manages the Cryptographic License Keys Allocation Pool across the 4 Tiers.
 */

const KEYS_STORAGE_KEY = 'dxhub_mdm_keys_pool';

export const INITIAL_KEY_STATS = {
  superDistributorPool: 5000,
  superDistributorAllocated: 2450,
  cityDistributorPool: 1200,
  cityDistributorAllocated: 850,
  retailerPool: 150,
  activeEnrolledDevices: 128,
  batches: [
    {
      batchId: 'BATCH-APEX-901',
      sender: 'DXHUB Master Cloud',
      receiver: 'East Zone Super Distributor',
      quantity: 2000,
      date: '2026-11-01',
      status: 'DELIVERED'
    },
    {
      batchId: 'BATCH-CITY-402',
      sender: 'East Zone Super Distributor',
      receiver: 'Patna Regional Hub',
      quantity: 500,
      date: '2026-11-02',
      status: 'DELIVERED'
    },
    {
      batchId: 'BATCH-RET-118',
      sender: 'Patna Regional Hub',
      receiver: 'Om Telecom',
      quantity: 50,
      date: '2026-11-03',
      status: 'DELIVERED'
    }
  ]
};

export const KeyModel = {
  getStats() {
    try {
      const data = localStorage.getItem(KEYS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(KEYS_STORAGE_KEY, JSON.stringify(INITIAL_KEY_STATS));
        return INITIAL_KEY_STATS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_KEY_STATS;
    }
  },

  allocateKeys(fromRole, toRole, receiverName, quantity) {
    const stats = this.getStats();
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return { success: false, error: 'Invalid quantity' };

    if (fromRole === 'super_distributor' && stats.superDistributorPool < qty) {
      return { success: false, error: 'Insufficient Apex pool keys' };
    }
    if (fromRole === 'distributor' && stats.cityDistributorPool < qty) {
      return { success: false, error: 'Insufficient City Hub keys' };
    }

    if (fromRole === 'super_distributor') {
      stats.superDistributorPool -= qty;
      stats.superDistributorAllocated += qty;
      stats.cityDistributorPool += qty;
    } else if (fromRole === 'distributor') {
      stats.cityDistributorPool -= qty;
      stats.cityDistributorAllocated += qty;
      stats.retailerPool += qty;
    }

    const newBatch = {
      batchId: `BATCH-${Date.now().toString().slice(-6)}`,
      sender: fromRole === 'super_distributor' ? 'Zonal Apex Pool' : 'Regional City Hub',
      receiver: receiverName || 'Registered Partner',
      quantity: qty,
      date: new Date().toISOString().split('T')[0],
      status: 'DELIVERED'
    };

    stats.batches.unshift(newBatch);
    localStorage.setItem(KEYS_STORAGE_KEY, JSON.stringify(stats));
    return { success: true, stats, newBatch };
  }
};

