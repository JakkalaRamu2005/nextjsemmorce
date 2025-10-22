"use client"
import "./login.css"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useSession } from "next-auth/react"
const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    }); 

    const handleLogin = async(event) => {
        event.preventDefault();
       

      const result  = await  signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        })

        if(result.error){
            console.log("Error during sign in:", result.error);
        }
        if(result.ok){
            console.log("Sign in successful");
        
            window.location.href = "/";
        }
    }
    return (
        <div>
            <h1>Login Page</h1>
            <form className="form" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
