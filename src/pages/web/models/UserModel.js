/**
 * UserModel.js - [MODEL]
 * 4-Tier Supply Chain Persona Definitions and Demo Logins
 */

export const TIERS = {
  SUPER_DISTRIBUTOR: 'super_distributor',
  DISTRIBUTOR: 'distributor',
  RETAILER: 'retailer',
  CUSTOMER: 'customer'
};

export const DEMO_PORTAL_USERS = [
  {
    role: TIERS.SUPER_DISTRIBUTOR,
    name: 'Zonal Head (East Region)',
    email: 'super@dxhub.in',
    pin: '9900',
    title: 'Super Distributor',
    badge: 'Apex Zonal Command',
    keyBalance: 5000,
    region: 'North & East India'
  },
  {
    role: TIERS.DISTRIBUTOR,
    name: 'Patna Regional Hub',
    email: 'distributor@dxhub.in',
    pin: '7700',
    title: 'City Distributor',
    badge: 'City Channel Partner',
    keyBalance: 1200,
    region: 'Patna Metro'
  },
  {
    role: TIERS.RETAILER,
    name: 'Om Telecom & Electronics',
    email: 'retailer@dxhub.in',
    pin: '5500',
    title: 'Retailer & Store Owner',
    badge: 'Verified Point of Sale',
    keyBalance: 150,
    region: 'Shop #14, Fraser Road'
  },
  {
    role: TIERS.CUSTOMER,
    name: 'Rahul Verma',
    phone: '9876543210',
    imei: '864209051839201',
    title: 'Device Owner / Borrower',
    badge: 'Financed Consumer',
    activeLoan: 'Samsung Galaxy M14 5G'
  }
];

export const UserModel = {
  getDemoUsers() {
    return DEMO_PORTAL_USERS;
  },

  findByRole(role) {
    return DEMO_PORTAL_USERS.find(u => u.role === role);
  },

  getCurrentSession() {
    try {
      const saved = localStorage.getItem('dxhub_web_portal_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  setSession(user) {
    localStorage.setItem('dxhub_web_portal_user', JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem('dxhub_web_portal_user');
  }
};

