import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { AuthProvider } from './contexts/AuthContext';
import { CalendarProvider } from './components/Calendar/CalendarContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CalendarProvider>
          <Router />
        </CalendarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
