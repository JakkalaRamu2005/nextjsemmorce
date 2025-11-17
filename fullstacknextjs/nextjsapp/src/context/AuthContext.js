'use client'

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const res = await fetch('/api/check-auth', {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
            }
        } catch (error) {
            console.error('Auth check failed', error);
        } finally {
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

    const logout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST' });
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // --- NEW FUNCTION ---
    // This function will be called from our Profile page to save new data.
    const updateUser = async (updatedData) => {
        try {
            const res = await fetch('/api/check-auth', { // We send the request to our new PATCH route
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            const data = await res.json();

            if (res.ok) {
                // If saving worked, we update the 'user' state for the whole app.
                // This will make the navbar and profile page update instantly.
                setUser(data.user);
                return { success: true, message: data.message };
            } else {
                return { success: false, error: data.message || 'Update failed' };
            }
        } catch (error) {
            console.error('Update error:', error);
            return { success: false, error: 'Profile update failed' };
        }
    };


    return (
        // Add 'updateUser' to the value so other components can use it
        <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);