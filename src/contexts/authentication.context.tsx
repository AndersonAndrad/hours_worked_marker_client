import * as jwt_decode from 'jwt-decode';

import { ReactElement, createContext, useState } from "react";

import { User } from "@/interfaces/User.interface";

interface AuthenticationProps {
  setToken(token: string): void;
  retrieveUser(): User | undefined;
  singOut(): void;
}

export const AuthenticationContext = createContext<AuthenticationProps>({} as AuthenticationProps);

export function AuthenticationProvider({ children }: { children: ReactElement }) {
  const [localToken, setLocalToken] = useState<string | undefined>('');

  const setToken = (token: string): void => {
    setLocalToken(token);

    localStorage.setItem('authorization', token);
  }

  const retrieveUser = (): User | undefined => {
    const localStorageToken = localStorage.getItem('authorization');

    if (!localStorageToken) return undefined

    return jwt_decode.jwtDecode(localStorageToken);
  }

  const singOut = (): void => {
    setLocalToken(undefined);
  };

  return (
    <AuthenticationContext.Provider value={{ setToken, retrieveUser, singOut }}>
      {children}
    </AuthenticationContext.Provider>
  )
}