import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/carteira" element={<Wallet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
