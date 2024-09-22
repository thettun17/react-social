import { createContext, useContext, useMemo, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import Comment from "./pages/Comments";

const AppContext = createContext();

const router = createBrowserRouter([
    {
        path: '/',
        element: <Template />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/comments/:id",
                element: <Comment />
            },
            {
                path: "/profile/:id",
                element: <Profile />
            },
            {
                path: "/likes/:id",
                element: <Likes />
            }
        ]
    }
])

export function useApp() {
    return useContext(AppContext)
}


export default function ThemeApp() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [globalMsg, setGlobalMsg] = useState(null);
    const [auth, setAuth] = useState(null);
    const [mode, setMode] = useState("dark");

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: mode,
                primary: deepPurple,
                banner: mode === "dark" ? grey[800] : grey[200],
                text: {
                    fade: grey[500],
                },
            },
        });
    }, [mode])

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{ showForm, setShowForm, mode, setMode, showDrawer, setShowDrawer, globalMsg, setGlobalMsg, auth, setAuth }}>
                <RouterProvider router={router} />
                <CssBaseline />
            </AppContext.Provider>
        </ThemeProvider>
    )
}