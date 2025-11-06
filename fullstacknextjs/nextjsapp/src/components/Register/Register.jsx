"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../Register/register.css";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const {login} = useAuth();
   

   const [message, setMessage] = useState({
        type: "",
        text: ""
    });


    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Auto login after successful registration
                const loginResult = await login(formData.email, formData.password);
                if (loginResult.success) {
                    setMessage({ type: 'success', text: 'Registration successful!' });
                    router.push("/");
                } else {
                    setMessage({ type: 'error', text: 'Registration successful but login failed' });
                }
            } else {
                setMessage({ type: 'error', text: data.message || "Registration failed" });
            }
        } catch (err) {
            setMessage({ type: 'error', text: "Something went wrong. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">Create Account</h1>


                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}


                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                            placeholder="Enter password (min 6 characters)"
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="switch-page">
                    Already have an account?
                    <a href="/login"> Login here</a>
                </p>
            </div>
        </div>
    );
}
