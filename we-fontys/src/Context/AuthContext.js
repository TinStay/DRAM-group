import React, { useContext, useState, useEffect } from "react";
// Auth
import { auth } from "../firebase";

// Create a context
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // State
  const [currentUser, setCurrentUser] = useState();

 
  // On component mount
  useEffect(() => {
    // Update current user state when auth state changes
    // onAuthStateChanged returns a function which can be used to unsubscribe 
    // to the onAuthStateChanged listener when component unmounts
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe
  }, []);

  // Signup with firebase
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  // Context provider value
  const value = {
    currentUser,
    signup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
