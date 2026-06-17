import { Button, TextField, Form } from "@bcgov/design-system-react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) return;

        const id = crypto.randomUUID();

        login(id);

        navigate("/dashboard");
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontFamily: "BC Sans"
        }}>
            <Form onSubmit={handleLogin} style={{ width: "320px" }}>
                <h2>Login</h2>

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
                <br></br>
                <Button type="submit" variant="primary" style={{ margin: "30px" }}>
                    Sign in
                </Button>
            </Form>
        </div>
    );
}

export default Login;