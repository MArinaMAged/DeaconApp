import { storage } from "@/App";
import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { loginSchema } from "../domain/login/schema";
// import useNavigation from "@react-navigation/core/lib/typescript/src/useNavigation";

export const AuthContext = createContext<{
  login: (response: AuthResponse) => void;
  logout: () => void;
  user: AuthResponse | null;
}>({
  user: null,
  login: () => {},
  logout: () => {}
});

interface AuthResponse {
    access_token: string;
    email: string;
    expires: string | null;
    expires_in: number;
    id: number;
    isFirstTimeLogin: boolean;
    issued: string;
    name: string;
    nameAr: string;
    nameEn: string;
    organizationId: number | null;
    organizationImage: string | null;
    organizationName: string | null;
    organizationNameAr: string | null;
    organizationNameEn: string | null;
    phoneNumber: string | null;
    profileImage: string | null;
    roleName: string;
    token_type: string;
    userName: string;
  }
  
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const navigation = useNavigation();
  
  const [user, setUser] = useState<AuthResponse| null>(null); 
    useEffect(()=>{
        if(user===null){
            const token = storage.getString('@auth_token');
            const userData = storage.getString('@user_data');
            if (token && userData) {
                setUser(JSON.parse(userData));
            }
        }
    },[user])
  const login = (response:AuthResponse) => {
    setUser(response);
        storage.set('@auth_token', loginSchema.parse(response)?.access_token);
        storage.set('@user_data', JSON.stringify(response));
    
  };

  const logout = () => {
    setUser(null);
    storage.clearAll();
    // navigation?.
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
