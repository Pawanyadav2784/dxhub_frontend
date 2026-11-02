import api from './api';
import { ENDPOINTS } from '../utils/endpoints';

const supportTicketService = {
  async createTicket(ticketData) {
    const response = await api.post(ENDPOINTS.SUPPORT_TICKETS.BASE, ticketData);
    return response.data;
  },

  async getMyTickets() {
    const response = await api.get(ENDPOINTS.SUPPORT_TICKETS.MY_TICKETS);
    return response.data;
  }
};

export default supportTicketService;
