/* eslint-disable react/prop-types */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';
import { axiosInt } from '../Hook/useAxios';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: '',
  });

  const [loadding, setLoadding] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, curent => {
      if (curent) {
        const newUser = {
          name: curent.displayName,
          email: curent.email,
          photo: curent.photoURL,
        };

        setUser({
          ...newUser,
        });

        axiosInt
          .post('/jwt', newUser)
          .catch(err => console.log(err.message));

        setLoadding(false);
      } else {
        setUser({
          ...user,
          name: '',
          email: '',
          photo: '',
        });
        setLoadding(false);
      }
    });

    () => {
      unsubscribe();
    };
  }, []);

  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };
  const value = {
    user,
    loadding,
    setUser,
    googleSignIn,
    createUser,
    loginUser,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
