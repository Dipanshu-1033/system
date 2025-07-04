
const API_BASE_URL = 'http://localhost:8080/api';

export const appointmentService = {
  async bookAppointment(appointmentData) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...appointmentData,
        userId: user.id
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to book appointment');
    }
    
    return response.json();
  },

  async getAllAppointments() {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`${API_BASE_URL}/appointments?userId=${user.id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }
    
    return response.json();
  },

  async cancelAppointment(appointmentId) {
    const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to cancel appointment');
    }
    
    return response.ok;
  }
};
