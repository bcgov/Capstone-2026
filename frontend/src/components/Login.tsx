import { Button, TextField, Form } from "@bcgov/design-system-react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../feedback/FeedbackProvider";
import { useAuth } from "../auth/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { apiBaseUrl } = useFeedback();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`${apiBaseUrl}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: username,
                password
            })
        });

        const data = await res.json();
        login(data.id);
        navigate("/dashboard");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f6f6f6",
                fontFamily: "BC Sans",
                padding: "1rem"
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    width: "100%",
                    maxWidth: "420px"
                }}
            >
                <h1
                    style={{
                        marginTop: 0,
                        marginBottom: "0.5rem",
                        fontSize: "2rem"
                    }}
                >
                    Sign In
                </h1>
                <Form
                    onSubmit={handleLogin}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem"
                    }}
                >
                    <TextField
                        label="Username"
                        value={username}
                        onChange={setUsername}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Sign In
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;