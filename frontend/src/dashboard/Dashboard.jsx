import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from './userInfo';
import InvoiceTable from './invoiceTable';
import { fetchInvoices, triggerZapier } from '../api';
import '../index.css';

function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    setUserInfo(userData);

    if (userData?.token) {
      fetchInvoices(userData.token).then((data) => {
        setInvoices(data.invoices || []);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/login');
  };

  return (
    <div className='dashboard'>
      <UserInfo userInfo={userInfo} onLogout={handleLogout} />
      <InvoiceTable invoices={invoices} onTriggerZapier={triggerZapier} />
    </div>
  );
}

export default Dashboard;
