import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { postLogin } from "../libs/fetcher";
import { useApp } from "../ThemeApp";

export default function Login() {
    const usernameInput = useRef();
    const passwordInput = useRef();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setAuth } = useApp();

    const login = () => {
        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        if(!username || !password) {
            setError(" username and password required ");
            return false;
        }

        loginMutation.mutate({username, password})
    }

    const loginMutation = useMutation(
        async ({username, password}) => postLogin(username, password),
        {
            onError: async () => setError("Incorrect Username or Password"),
            onSuccess: async result => {
                setAuth(result.user)
                localStorage.setItem("token", result.token);
                navigate("/")
            }
        }
    )

    return (
        <Box>
            <Typography variant="h3">Login</Typography>
            {
                error && (
                    <Alert severity="warning" sx={{ mt: 2 }}> {error} </Alert>
                )
            }
            <form onSubmit={
                e => {
                    e.preventDefault();
                    login();
                }
            }>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2, }}>
                    <TextField placeholder="Username" fullWidth  inputRef={usernameInput}/>
                    <TextField placeholder="Password" type="password" fullWidth  inputRef={passwordInput}/>
                    <Button type="submit" variant="contained" fullWidth>
                        Login
                    </Button>
                </Box>
            </form>
        </Box>
    );
}