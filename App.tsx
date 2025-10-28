
import React, { useState, useEffect } from 'react';
import AdminPage from './pages/AdminPage';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (route === '#/admin') {
    return <AdminPage />;
  }

  return <MainPage />;
};

export default App;
