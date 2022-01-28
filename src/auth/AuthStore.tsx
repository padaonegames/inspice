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
  /** API JWT token for current session */
  accessToken: string | undefined;
  /** Helper method to modify currently authenticated user from useContext hook */
  setUserData: (newData: UserData | undefined) => void;
  /** Helper method to modify current access token from useContext hook */
  setAccessToken: (newToken: string | undefined) => void;
}
const AuthContext = React.createContext<IAuthContext>({
  userData: undefined,
  accessToken: undefined,
  setUserData: (_) => { },
  setAccessToken: (_) => { }
});

/** 
 * Wrapper over an AuthContext provider to provide helper methods and state management for user handling operations to children.
 * Preserves authentication data between sessions by keeping it within a localStorage variable.
 */
const AuthStore: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData | undefined>(() => {
    const prevUserData = localStorage.getItem('userData');
    if (prevUserData) return JSON.parse(prevUserData) as UserData;
    return undefined;
  });

  const [accessToken, setAccessToken] = useState<string | undefined>(() => {
    const prevToken = localStorage.getItem('accessToken');
    if (prevToken) return prevToken;
    return undefined;
  });

  const setData = (data: UserData | undefined) => {
    setUserData(data);
    if (data) {
      localStorage.setItem('userData', JSON.stringify(data));
    }
    else {
      localStorage.removeItem('userData');
    }
  };

  const setToken = (token: string | undefined) => {
    setAccessToken(token);
    if (token) {
      localStorage.setItem('accessToken', token);
    }
    else {
      localStorage.removeItem('accessToken');
    }
  };

  return (
    <AuthContext.Provider value={{
      userData,
      accessToken,
      setUserData: setData,
      setAccessToken: setToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthStore, AuthContext };