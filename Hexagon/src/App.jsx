import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditor from './pages/AdminEditor';
import Frontend from './pages/Frontend';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/edit/:pageId" element={<AdminEditor />} />
        
        {/* Frontend Route (Catch-all) */}
        <Route path="/*" element={<Frontend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
