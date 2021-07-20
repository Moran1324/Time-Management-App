import React, {
  createContext, useState, useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import {
  registerUser, loginUser, logoutUser, authenticateUser,
} from '../api/network';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const history = useHistory();
  const [isLogged, setLogged] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const initAuth = async () => {
      // if (!history) return;
      console.log('history: ', history);
      if (isLogged) return;
      const refreshToken = Cookies.get('refreshToken');
      if (!refreshToken) {
        setLogged(false);
        history.push('/login');
        return;
      }
      try {
        const { message } = await authenticateUser(refreshToken);
        console.log('message: ', message);
        setLogged(true);
      } catch (err) {
        console.log(err.message);
        setLogged(false);
      }
    };
    initAuth();
  }, [history]);

  const signup = async (userObj) => {
    try {
      await registerUser(userObj);
      return true;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };

  const signin = async (credentials) => {
    try {
      const user = await loginUser(credentials);
      setLogged(true);
      setCurrentUser(user);
      return true;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };

  const signout = async () => {
    const refreshToken = Cookies.get('refreshToken');
    try {
      await logoutUser(refreshToken);
      setCurrentUser(null);
      setLogged(false);
      return true;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };

  const value = {
    isLogged, currentUser, signup, signin, signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
