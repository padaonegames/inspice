import React, { useState } from "react";
import { UserData } from "../services/user.model";

/**
 * This component provides access to a wrapping context that
 * contains information relative to the currently authenticated
 * user as well as a helper method to access and modify this information
 * dynamically from any child by using the useContext hook from a child component.
 */
interface IAuthContext {
  /** Data object for currently authenticated user (or undefined if not authenticated) */
  userData: UserData | undefined;
  /** Helper method to modify currently authenticated user from useContext hook */
  setUserData: (newData: UserData | undefined) => void;
}
const AuthContext = React.createContext<IAuthContext>({
  userData: undefined,
  setUserData: (_) => {},
});

/** 
 * Wrapper over an AuthContext provider to provide helper methods and state management for user handling operations to children.
 * Preserves authentication data between sessions by keeping it within a localStorage variable.
 */
const AuthStore: React.FC = ({ children }) => {
  const [userData, setUserdata] = useState<UserData | undefined>(() => {
    const prevUserData = localStorage.getItem('userData');
    if (prevUserData) return JSON.parse(prevUserData) as UserData;
    return undefined;
  });

  const setData = (data: UserData | undefined) => {
    setUserdata(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData: setData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthStore, AuthContext };