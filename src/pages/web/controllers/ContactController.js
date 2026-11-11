/**
 * ContactController.js - [CONTROLLER]
 * Handles IT project inquiries, tech consultations, and legacy dealership onboarding.
 */

export const ContactController = {
  /**
   * Submit modern IT Project / Software Consultation inquiry
   */
  async submitProjectInquiry(formData) {
    if (!formData.name || !formData.phone) {
      return {
        success: false,
        error: 'Please provide your Name and Phone/WhatsApp number.'
      };
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return { 
        success: false, 
        error: 'Please enter a valid 10-digit mobile or WhatsApp number.' 
      };
    }

    if (formData.email && !formData.email.includes('@')) {
      return {
        success: false,
        error: 'Please enter a valid email address.'
      };
    }

    await new Promise(resolve => setTimeout(resolve, 600));

    // Save lead in local store for record
    const leads = JSON.parse(localStorage.getItem('dxhub_project_inquiries') || '[]');
    const newLead = {
      id: `DX-INQ-${Date.now().toString().slice(-5)}`,
      ...formData,
      timestamp: new Date().toISOString()
    };
    leads.unshift(newLead);
    localStorage.setItem('dxhub_project_inquiries', JSON.stringify(leads));

    return {
      success: true,
      message: `🎉 Thank you, ${formData.name}! Your project inquiry has been received. Our senior engineering architect will contact you at ${formData.phone} within 2 hours.`
    };
  },

  /**
   * Legacy dealership inquiry handler (maintained for backward compatibility)
   */
  async submitDealershipInquiry(formData) {
    if (!formData.name || !formData.phone) {
      return {
        success: false,
        error: 'Please fill in Name and Phone.'
      };
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const leads = JSON.parse(localStorage.getItem('dxhub_web_leads') || '[]');
    const newLead = {
      id: `LEAD-${Date.now().toString().slice(-5)}`,
      ...formData,
      timestamp: new Date().toISOString()
    };
    leads.unshift(newLead);
    localStorage.setItem('dxhub_web_leads', JSON.stringify(leads));

    return {
      success: true,
      message: `🎉 Thank you ${formData.name}! Your inquiry has been submitted. Our team will contact you at ${formData.phone} within 2 hours.`
    };
  }
};


