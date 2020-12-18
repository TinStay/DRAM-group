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
  const [isLoading, setIsLoading] = useState(true)
 
  // On component mount
  useEffect(() => {
    // Update current user state when auth state changes
    // onAuthStateChanged returns a function which can be used to unsubscribe 
    // to the onAuthStateChanged listener when component unmounts
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      
      setIsLoading(false)
    });

    return unsubscribe
  }, []);

  // Sign up with firebase
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  // Sign in with firebase
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  // Log out
  const logout = (email, password) => {
    return auth.signOut();
  };

  // Context provider value
  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>
      {!isLoading && children}
      </AuthContext.Provider>;
};
