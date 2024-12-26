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
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        const newUser = {
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        };

        if (currentUser?.email) {
          setLoadding(true);
          axiosInt
            .post('/jwt', newUser)
            .then(() => {
              setUser(newUser);
              setLoadding(false);
            })
            .catch(err => {
              console.error(err.message);
              setLoadding(false);
            });
        }
      } else {
        // Reset user state when no user is authenticated
        setUser({
          name: '',
          email: '',
          photo: '',
        });
        setLoadding(false);
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array to run only once on component mount


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
