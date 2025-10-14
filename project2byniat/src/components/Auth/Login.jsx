"use client"
import "./login.css"
import { signIn, singIn } from "next-auth/react"
import { useState } from "react"
const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    }); 

    const handleLogin = async(event) => {
        event.preventDefault();
        console.log("Login form submitted");

      const result  = await  signIn("Credentials", {
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
                    <input type="text" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>

                <div>
                    <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
