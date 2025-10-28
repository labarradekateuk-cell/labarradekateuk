
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

export type Theme = 'light' | 'dark';

const AdminPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('adminTheme') as Theme) || 'light';
  });

  useEffect(() => {
    document.body.classList.add('admin-bg');
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('adminTheme', theme);
    
    return () => {
      document.body.classList.remove('admin-bg');
      document.documentElement.removeAttribute('data-theme');
    };
  }, [theme]);
  
  const handleToggleTheme = () => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="min-h-screen">
      {isAuthenticated ? <AdminDashboard theme={theme} onToggleTheme={handleToggleTheme} /> : <AdminLogin />}
    </div>
  );
};

export default AdminPage;