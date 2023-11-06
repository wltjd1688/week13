import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Singup from '../pages/Singup';
import Boards from '../pages/Boards';
import Layout from './Layout';
import Board from '../pages/Board';
import ProtectedRoute from 'components/LoginCheck';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="singup" element={<Singup />} />
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="boards" element={<Boards />} />
            <Route path="boards/:id" element={<Board />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;