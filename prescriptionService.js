
const API_BASE_URL = 'http://localhost:8080/api';

export const prescriptionService = {
  async addPrescription(prescriptionData) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`${API_BASE_URL}/prescriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...prescriptionData,
        userId: user.id
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add prescription');
    }
    
    return response.json();
  },

  async getPrescriptionsByUserId() {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`${API_BASE_URL}/prescriptions/${user.id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch prescriptions');
    }
    
    return response.json();
  }
};
