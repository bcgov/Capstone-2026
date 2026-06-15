import { Button, TextField, Form } from "@bcgov/design-system-react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // TEMP: mock login
        if (username && password) {
            navigate("/dashboard");
        }
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

                <Button type="submit" variant="primary">
                    Sign in
                </Button>
            </Form>
        </div>
    );
}

export default Login;