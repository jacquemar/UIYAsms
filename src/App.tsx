import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Services from './pages/Services';
import Messages from './pages/Messages';
import Admins from './pages/Admins';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/services" element={<Services />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/admins" element={<Admins />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;