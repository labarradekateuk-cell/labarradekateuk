
import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
    </div>
  );
};

export default AdminPage;
