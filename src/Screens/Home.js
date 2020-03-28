import React, { useEffect, useContext } from 'react';
import { Centered } from '../Layouts/Centered';
import { AuthContext } from '../AuthContext';

export const Home = ({ navigate }) => {
  const {
    auth: { name },
  } = useContext(AuthContext);
  return <Centered title="Home" subTitle={`Welcome ${name}`} />;
};
