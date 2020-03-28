import React from 'react';

export const emptyAuth = {
  id: null,
  name: null,
  email: null,
  emailVerified: null,
};

const noop = () => undefined;

export const AuthContext = React.createContext({auth: emptyAuth, signOut: noop, signIn: noop});

AuthContext.displayName = "AuthContext"
