"use client";
// We need 'useState' to track the form data and edit mode
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import "./Profile.css";
import "../Home/home.css"; // Reuse home.css for the navbar

export default function Profile() {
    const router = useRouter();
    // Get the new 'updateUser' function from our context
    const { user, logout, loading, updateUser } = useAuth();

    // --- NEW STATES ---
    // 'isEditing' tracks if we should show the form or just the text
    const [isEditing, setIsEditing] = useState(false);
    // 'formData' holds the information the user is typing into the form
    const [formData, setFormData] = useState({ name: "", bio: "" });
    // 'message' will show success or error messages
    const [message, setMessage] = useState({ type: "", text: "" });
    // 'isSubmitting' tracks when we are saving data
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
        // When the component loads, fill the form data with the user's current info
        if (user) {
            setFormData({
                name: user.name || "",
                bio: user.bio || ""
            });
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    // --- NEW FUNCTIONS ---

    // This runs when the user types in an input box
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // This runs when the user clicks the "Save Changes" button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: "", text: "" });

        const result = await updateUser(formData);

        if (result.success) {
            setMessage({ type: "success", text: "Profile updated successfully!" });
            setIsEditing(false); // Go back to "view" mode
        } else {
            setMessage({ type: "error", text: result.error });
        }
        setIsSubmitting(false);
    };

    // This runs when the user clicks the "Cancel" button
    const handleCancel = () => {
        setIsEditing(false);
        // Reset the form back to the original user data
        if (user) {
            setFormData({ name: user.name, bio: user.bio });
        }
    };

    // --- LOADING AND REDIRECT LOGIC ---
    if (loading) {
        // We can make a simple loading screen
        return (
            <div className="profile-page-container">
                 <div className="loading-fullscreen">Loading profile...</div>
            </div>
        )
    }

    if (!user) {
        return null; // Will redirect
    }

    // Format the date to be more readable
    const joinedDate = new Date(user.createdAt).toLocaleDateString();

    return (
        <div className="profile-page-container">
            {/* Navbar (no changes needed here) */}
            <nav className="navbar">
                <div className="nav-content">
                    <h2 className="logo">
                        <Link href="/">MyApp</Link>
                    </h2>
                    <div className="nav-user">
                        <span className="welcome-text">
                            Welcome, <strong>{user.name}</strong>
                        </span>
                        <Link href="/profile" className="profile-link-nav">
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

                    {/* This shows either the title or the form, based on 'isEditing' state */}
                    {isEditing ? (
                        
                        // --- EDITING MODE ---
                        <form onSubmit={handleSubmit} className="profile-edit-form">
                            <h1 className="profile-title">Edit Your Profile</h1>
                            
                            {/* Message box for errors or success */}
                            {message.text && (
                                <div className={`message ${message.type}`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="form-group-profile">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-group-profile">
                                <label htmlFor="bio">About Me (Bio)</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Write a little about yourself..."
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="profile-btn-group">
                                <button 
                                    type="submit" 
                                    className="profile-save-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </button>
                                <button 
                                    type="button" 
                                    className="profile-cancel-btn"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>

                    ) : (
                        
                        // --- VIEW MODE ---
                        <>
                            <h1 className="profile-title">Your Profile</h1>
                            
                            {/* Message box (in case we just saved) */}
                            {message.text && message.type === "success" && (
                                <div className={`message ${message.type}`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="profile-info-grid">
                                <div className="info-item">
                                    <span className="info-label">Full Name</span>
                                    <span className="info-value">{user.name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Email</span>
                                    <span className="info-value">{user.email}</span>
                                </div>
                                {/* NEW: Show the Bio */}
                                <div className="info-item">
                                    <span className="info-label">About Me (Bio)</span>
                                    <span className="info-value bio">
                                        {user.bio || <em>You haven't added a bio yet.</em>}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Joined On</span>
                                    <span className="info-value">{joinedDate}</span>
                                </div>
                            </div>
                            {/* The "Edit Profile" button to switch modes */}
                            <div className="profile-btn-group">
                                <button 
                                    className="profile-edit-btn"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}