"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "../Home/home.css";
import Link from "next/link"; 

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

    // ... (keep the loading and !user returns) ...
    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    if (!user) {
        return null;
    }

    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="nav-content">
                    <h2 className="logo">
                        <Link href="/">MyApp</Link> {/* <-- 2. MAKE LOGO A LINK */}
                    </h2>
                    <div className="user-info">
                        <span>Welcome, {user.name}</span>
                        
                        {/* 3. ADD THIS PROFILE LINK */}
                        <Link href="/profile" className="profile-link">
                            Profile
                        </Link>
                        
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <main className="main-content">
                <h1>Welcome to Your Dashboard</h1>
                {/* We will add resource content here later */}
            </main>
        </div>
    );
}