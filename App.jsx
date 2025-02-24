import React from 'react';
import { UserDataProvider } from './context/UserDataContext';
import { APIProvider } from './context/APIContext';
import MainLayout from './components/layout/MainLayout';

/**
 * Main application component
 * 
 * Serves as the entry point for the Sobriety Support application
 * and wraps the app in necessary context providers
 */
function App() {
  return (
    <APIProvider>
      <UserDataProvider>
        <MainLayout />
      </UserDataProvider>
    </APIProvider>
  );
}

export default App;
