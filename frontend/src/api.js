import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:8080/auth',
});

// Google authentication
export const googleAuth = (code) => authApi.get(`/google?code=${code}`);

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const fetchInvoices = async (token) => {
  try {
    const response = await api.get('/invoices/api/invoices', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching invoices:', error.response?.data || error.message);
    return { invoices: [] };
  }
};

export const triggerZapier = async (invoice) => {
  try {
    const response = await api.post('/api/trigger-zapier', invoice, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      alert(`Zapier triggered for invoice: ${invoice._id}`);
    } else {
      alert(`Error: ${response.data?.message || 'Failed to trigger Zapier'}`);
    }
  } catch (error) {
    console.error('Error triggering Zapier:', error.response?.data || error.message);
  }
};
