"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "../Home/home.css";

export default function Home() {
    const router = useRouter();
    const { user, logout } = useAuth();

    useEffect(() => {
        // If no user in context, redirect to login
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="nav-content">
                    <h2 className="logo">MyApp</h2>
                    <div className="user-info">
                        <span>Welcome, {user.name}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <main className="main-content">
                {/* Add your dashboard content here */}
                <h1>Welcome to Your Dashboard</h1>
            </main>
        </div>
    );
}