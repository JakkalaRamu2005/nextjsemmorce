"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "../Home/home.css";

export default function Home() {
    const router = useRouter();
    const { user, logout, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    // Show loading state while checking authentication
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    // If not loading and no user, don't render anything (will redirect)
    if (!user) {
        return null;
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
                <h1>Welcome to Your Dashboard</h1>
            </main>
        </div>
    );
}