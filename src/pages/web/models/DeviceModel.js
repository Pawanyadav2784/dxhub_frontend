/**
 * DeviceModel.js - [MODEL]
 * Represents MDM Financed Hardware Entities and their cryptographic states.
 */

const STORAGE_KEY = 'dxhub_mdm_devices';

export const INITIAL_DEVICES = [
  {
    id: 'DEV-98214',
    imei1: '864209051839201',
    imei2: '864209051839202',
    brand: 'Samsung',
    model: 'Galaxy M14 5G',
    customerName: 'Rahul Verma',
    customerPhone: '+91 98765 43210',
    retailerName: 'Om Telecom (Patna Hub)',
    totalLoan: 14999,
    emiAmount: 1850,
    paidEmis: 3,
    totalEmis: 8,
    nextDueDate: '2026-11-10',
    status: 'ACTIVE', // 'ACTIVE' | 'LOCKED' | 'PENDING'
    lockReason: '',
    lastSync: 'Just now',
    battery: 88,
    simImsi: '40445091823901',
    offlineCryptoTimerHours: 72,
    simLocked: true,
    usbDebugDisabled: true,
    hardResetBlocked: true,
  },
  {
    id: 'DEV-77302',
    imei1: '861093049182048',
    imei2: '861093049182049',
    brand: 'Xiaomi',
    model: 'Redmi 13C 5G',
    customerName: 'Vikram Singh',
    customerPhone: '+91 91234 56789',
    retailerName: 'Gupta Mobile Gallery',
    totalLoan: 10999,
    emiAmount: 1450,
    paidEmis: 2,
    totalEmis: 6,
    nextDueDate: '2026-10-28', // overdue
    status: 'LOCKED',
    lockReason: 'EMI Overdue (7 Days Grace Expired)',
    lastSync: '2 hrs ago',
    battery: 64,
    simImsi: '40420081923182',
    offlineCryptoTimerHours: 72,
    simLocked: true,
    usbDebugDisabled: true,
    hardResetBlocked: true,
  },
  {
    id: 'DEV-41093',
    imei1: '869018274019283',
    imei2: '869018274019284',
    brand: 'Realme',
    model: 'Narzo 60x 5G',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98111 22334',
    retailerName: 'Sri Balaji Electronics',
    totalLoan: 12499,
    emiAmount: 1600,
    paidEmis: 5,
    totalEmis: 6,
    nextDueDate: '2026-11-15',
    status: 'ACTIVE',
    lockReason: '',
    lastSync: '5 mins ago',
    battery: 92,
    simImsi: '40470091827391',
    offlineCryptoTimerHours: 72,
    simLocked: true,
    usbDebugDisabled: true,
    hardResetBlocked: true,
  },
  {
    id: 'DEV-19042',
    imei1: '863019284019283',
    imei2: '863019284019285',
    brand: 'Vivo',
    model: 'Y28 5G',
    customerName: 'Mohd. Faisal',
    customerPhone: '+91 97654 32109',
    retailerName: 'Delhi Central Communications',
    totalLoan: 13999,
    emiAmount: 1750,
    paidEmis: 1,
    totalEmis: 8,
    nextDueDate: '2026-11-05',
    status: 'ACTIVE',
    lockReason: '',
    lastSync: '12 mins ago',
    battery: 74,
    simImsi: '40411082910293',
    offlineCryptoTimerHours: 72,
    simLocked: true,
    usbDebugDisabled: true,
    hardResetBlocked: true,
  }
];

export const DeviceModel = {
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEVICES));
        return INITIAL_DEVICES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEVICES;
    }
  },

  getById(id) {
    const list = this.getAll();
    return list.find(d => d.id === id || d.imei1 === id || d.imei2 === id);
  },

  save(devices) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
    } catch (e) {
      console.error('Failed to persist devices:', e);
    }
  },

  updateStatus(deviceId, newStatus, reason = '') {
    const list = this.getAll();
    const updated = list.map(d => {
      if (d.id === deviceId || d.imei1 === deviceId) {
        return {
          ...d,
          status: newStatus,
          lockReason: newStatus === 'LOCKED' ? (reason || 'Admin Security Directive') : '',
          lastSync: 'Just now'
        };
      }
      return d;
    });
    this.save(updated);
    return updated.find(d => d.id === deviceId || d.imei1 === deviceId);
  },

  create(deviceData) {
    const list = this.getAll();
    const newDevice = {
      id: `DEV-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'ACTIVE',
      lastSync: 'Just now',
      battery: 100,
      offlineCryptoTimerHours: 72,
      simLocked: true,
      usbDebugDisabled: true,
      hardResetBlocked: true,
      ...deviceData
    };
    list.unshift(newDevice);
    this.save(list);
    return newDevice;
  }
};

