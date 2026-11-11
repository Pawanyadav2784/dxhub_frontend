/**
 * AuthController.js - [CONTROLLER]
 * Manages authentication and session switches across the 4-tier portals.
 */

import { UserModel, DEMO_PORTAL_USERS } from '../models/UserModel';

export const AuthController = {
  getCurrentSession() {
    return UserModel.getCurrentSession();
  },

  getAvailableRoles() {
    return DEMO_PORTAL_USERS;
  },

  async loginAsDemoRole(role) {
    const user = UserModel.findByRole(role);
    if (!user) return { success: false, error: 'Role not found' };

    await new Promise(resolve => setTimeout(resolve, 200));
    UserModel.setSession(user);
    return { success: true, user };
  },

  async loginWithPin(emailOrPhone, pin) {
    const user = DEMO_PORTAL_USERS.find(
      u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.pin === pin
    );

    await new Promise(resolve => setTimeout(resolve, 300));
    if (!user) {
      return { success: false, error: 'Invalid Email/Phone or Security PIN.' };
    }

    UserModel.setSession(user);
    return { success: true, user };
  },

  logout() {
    UserModel.clearSession();
    return { success: true };
  }
};

