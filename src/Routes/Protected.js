import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useEffect } from 'react';
import { useNavigate, Router } from '@reach/router';
import { Home } from '../Screens/Home';

export const Protected = () => {
  const { auth: {id}} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate('/login')
    }
  }, [id, navigate])

  return <Router>
    <Home path="/" />
  </Router>
}