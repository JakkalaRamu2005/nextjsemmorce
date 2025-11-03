"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../Home/home.css";

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem("user");
        
        if (!userData) {
            router.push("/login");
        } else {
            setUser(JSON.parse(userData));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
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
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </nav>

            <main className="main-content">
                <div className="welcome-section">
                    <h1 className="welcome-title">
                        Welcome, {user.name}! 🎉
                    </h1>
                    <p className="welcome-text">
                        You have successfully logged into your dashboard
                    </p>
                </div>

                <div className="user-card">
                    <h3 className="card-title">Your Profile</h3>
                    <div className="user-info">
                        <div className="info-row">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{user.name}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{user.email}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">User ID:</span>
                            <span className="info-value">{user._id}</span>
                        </div>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Dashboard</h3>
                        <p>View your statistics and analytics</p>
                    </div>
                    
                    <div className="feature-card">
                        <div className="feature-icon">⚙️</div>
                        <h3>Settings</h3>
                        <p>Manage your account preferences</p>
                    </div>
                    
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Tasks</h3>
                        <p>Create and manage your tasks</p>
                    </div>
                    
                    <div className="feature-card">
                        <div className="feature-icon">💬</div>
                        <h3>Messages</h3>
                        <p>Chat with your team members</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
