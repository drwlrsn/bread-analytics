import React from 'react';
import { Router } from '@reach/router';
import { Signup } from '../Screens/Signup';
import { Login } from '../Screens/Login';

export const Unprotected = () => (
  <Router>
    <Signup path="/signup" />
    <Login path="/login" />
  </Router>
);
