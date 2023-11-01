import React, { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import cookie from 'cookie';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = (email, password) => fetch('http://localhost:3000/api/login', {
    method: 'POST',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': cookie.parse(document.cookie)['XSRF-TOKEN'] || false,
    },
    body: JSON.stringify({ email, password })
  }).then(data => {
    fetchUser();

    return data;
  });

  const register = (email, password) => { }; // TODO

  const logout = (email, password) => fetch('http://localhost:3000/api/logout', {
    method: 'POST',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': cookie.parse(document.cookie)['XSRF-TOKEN'] || false,
    },
  }).then(data => {
    setUser(false);

    return data;
  });

  const sendPasswordResetEmail = email => { }; // TODO

  const confirmPasswordReset = (code, password) => { }; // TODO

  const fetchUser = async () => {
    try {
      const user = await fetch('http://localhost:3000/api/user', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': cookie.parse(document.cookie)['XSRF-TOKEN'] || false,
        },
      });
      if (user.status !== 200) {
        setUser(false);
        return;
      }

      const data = await user.json();
      setUser(data);
    } catch (error) {
      setUser(false);
    }
  };

  useEffect(() => {
    if(['/login', '/logout'].includes(router.pathname)) {
      return;
    }

    fetchUser();

    return () => fetchUser();
  }, []);

  return {
    user,
    login,
    register,
    logout,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}
