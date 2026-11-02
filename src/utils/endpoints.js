export const ENDPOINTS = {
  CONTACT: '/contact',
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    PROFILE: '/auth/profile',
    USERS: '/auth/users',
  },
  PRODUCTS: {
    BASE: '/products',
    FEATURED: '/products/featured',
    CATEGORIES: '/products/categories',
    VENDOR_PRODUCTS: '/products/vendor/my-products',
  },
  ORDERS: {
    BASE: '/orders',
    MY_ORDERS: '/orders/my-orders',
    VENDOR_ORDERS: '/orders/vendor/orders',
  },
  SUPPORT_TICKETS: {
    BASE: '/support-tickets',
    MY_TICKETS: '/support-tickets/my-tickets',
  },
  RETURNS: {
    BASE: '/returns',
    MY_REQUESTS: '/returns/my-requests',
  },
  SHIPROCKET: {
    CREATE_ORDER: '/shiprocket/create-order',
    SCHEDULE_PICKUP: '/shiprocket/schedule-pickup',
    TRACK: '/shiprocket/track',
    ORDER_TRACK: '/shiprocket/order-track',
    COURIERS: '/shiprocket/couriers',
    CANCEL_SHIPMENT: '/shiprocket/cancel-shipment',
    PICKUP_LOCATIONS: '/shiprocket/pickup-locations',
    GENERATE_AWB: '/shiprocket/generate-awb',
  },
  UPLOAD: {
    UPLOAD: '/upload/upload',
    DELETE: '/upload/delete',
  },
  WISHLIST: {
    BASE: '/wishlist',
    ADD: '/wishlist/add',
    REMOVE: '/wishlist/remove',
    CLEAR: '/wishlist/clear',
  }
};
