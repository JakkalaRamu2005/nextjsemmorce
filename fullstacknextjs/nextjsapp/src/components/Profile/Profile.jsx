"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link"; // Import the Link component
import "./Profile.css";
import "../Home/home.css"; // Reuse home.css for the navbar

export default function Profile() {
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

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!user) {
        return null; // Will redirect
    }

    // Format the date to be more readable
    const joinedDate = new Date(user.createdAt).toLocaleDateString();

    return (
        <div className="profile-page-container">
            {/* We'll re-use the navbar from the Home component */}
            <nav className="navbar">
                <div className="nav-content">
                    <h2 className="logo">
                        <Link href="/">MyApp</Link> {/* Link logo back to home */}
                    </h2>
                    <div className="user-info">
                        <span>Welcome, {user.name}</span>
                        {/* Add Profile link */}
                        <Link href="/profile" className="profile-link">
                            Profile
                        </Link>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Profile Content */}
            <main className="profile-main-content">
                <div className="profile-card">
                    <h1 className="profile-title">Your Profile</h1>
                    <div className="profile-info-grid">
                        <div className="info-item">
                            <span className="info-label">Full Name</span>
                            <span className="info-value">{user.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email</span>
                            <span className="info-value">{user.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Joined On</span>
                            <span className="info-value">{joinedDate}</span>
                        </div>
                    </div>
                    {/* We will add edit buttons here in the next step */}
                </div>
            </main>
        </div>
    );
}