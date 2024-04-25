import { createContext, useState, useMemo } from "react";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

import AppRouter from "./AppRouter";

export const ThemeContext = createContext();

export default function Theme() {
    const [ mode, setMode ] = useState("light");

    const theme = useMemo( () => {
        return createTheme({
            palette: {
                mode,
            },
        })
    },[mode]);

    return (
        <ThemeContext.Provider value={{mode, setMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppRouter />
            </ThemeProvider>
        </ThemeContext.Provider>
    )

}