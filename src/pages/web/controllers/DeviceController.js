/**
 * DeviceController.js - [CONTROLLER]
 * Orchestrates sub-second hardware lock/unlock, enrollment, and payment auto-unlock.
 */

import { DeviceModel } from '../models/DeviceModel';

export const DeviceController = {
  fetchAllDevices() {
    return DeviceModel.getAll();
  },

  getDeviceById(id) {
    return DeviceModel.getById(id);
  },

  async toggleLock(deviceId, reason = 'Administrative Control Directive') {
    const current = DeviceModel.getById(deviceId);
    if (!current) return { success: false, error: 'Device not found' };

    const newStatus = current.status === 'LOCKED' ? 'ACTIVE' : 'LOCKED';
    
    // Simulate sub-second network handshake with MQTT broker
    await new Promise(resolve => setTimeout(resolve, 350));

    const updated = DeviceModel.updateStatus(deviceId, newStatus, reason);
    return {
      success: true,
      device: updated,
      message: newStatus === 'LOCKED' 
        ? `🔒 Device ${current.brand} ${current.model} (IMEI: ${current.imei1}) successfully LOCKED.` 
        : `🔓 Device ${current.brand} ${current.model} unlocked & operational.`
    };
  },

  async enrollDevice(deviceData) {
    if (!deviceData.imei1 || !deviceData.customerName || !deviceData.customerPhone) {
      return { success: false, error: 'IMEI-1, Customer Name and Phone are required.' };
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    const created = DeviceModel.create(deviceData);
    return {
      success: true,
      device: created,
      message: `✅ Device enrolled successfully with Policy Profile v4.2.8.`
    };
  },

  async payEmiAndAutoUnlock(deviceId, utrNumber) {
    if (!utrNumber || utrNumber.length < 8) {
      return { success: false, error: 'Please enter a valid 12-digit UPI UTR reference number.' };
    }

    // Simulate instant NPCI payment gateway webhook verification
    await new Promise(resolve => setTimeout(resolve, 600));

    const updated = DeviceModel.updateStatus(deviceId, 'ACTIVE', '');
    return {
      success: true,
      device: updated,
      message: `🎉 Payment verified (UTR: ${utrNumber}). Your device has been unlocked automatically!`
    };
  }
};

