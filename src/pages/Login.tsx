import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { loginUser } from "../api";

export default function Login() { 
    const location = useLocation();
    const navigate = useNavigate();

    const [loginFormData, setloginFormData] = React.useState<{email: string; password: string}>({email: "", password: ""});
    const [error, setError] = React.useState<string | null>(null);

    const [status, setStatus] = React.useState<"idle" | "submitting">("idle");

    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setStatus("submitting");
    
        loginUser(loginFormData)
            .then(() => {
                localStorage.setItem("loggedin", "true");
                navigate(location.state?.from || "/host", { replace: true });
       
            })
            .catch((error) => {
                setError(error.message);
              
            })
            .finally(() => {
                setStatus("idle");
            });

    }

    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setloginFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>

            {
                location.state?.message && (
                    <h3 className="login-message">{location.state.message}</h3>
                )
            }

            {
                error && (
                    <h3 className="error-message">{error}</h3>
                )
            }   

            <form onSubmit={handleSubmit} className="login-form">
                <input
                type="email"
                onChange={handleChange}
                name="email"
                placeholder="test@test.com"
                value={loginFormData.email}
                />
                
                <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="********"
                value={loginFormData.password}
                />

            <button disabled={status === 'submitting'} className="login-button">
                {status === "submitting" ? "Logging in..." : "Log in"}    
            </button>    
            </form>

        </div>
    );
}
