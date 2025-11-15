'use client'

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        checkAuthStatus();
    },[]);

    const checkAuthStatus = async ()=>{
        try{
            const res = await fetch('/api/check-auth',{
                method:"GET",
                credentials:"include"
            })
            const data = await res.json();

            if(res.ok){
                setUser(data.user);
            }
        }catch(error){
            console.error('Auth check failed', error);
        }finally{
            setLoading(false);
        }
    }

    const login = async (email, password) => {


        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
                return { success: true };
            }

            return { success: false, error: data.message || 'Login failed' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Login failed' };
        }





    };

    const logout = async ()=>{
        try{
            await fetch('/api/logout', {method: 'POST'});
            setUser(null);
        }catch(error){
            console.error('Logout failed', error);
        }
    };


    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );


}

export const useAuth = ()=> useContext(AuthContext);