import { AppBar, Toolbar, Typography, IconButton, Badge} from "@mui/material";
import {
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
    DeleteSweep as ClearAllIcon,
    Checklist as CheckListIcon,
} from "@mui/icons-material";

import { useContext } from "react";
import { ThemeContext } from "./Theme";


export default function Header({clear, count}) {
    const { mode, setMode } = useContext(ThemeContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Badge
                    badgeContent={count}
                    color="error">
                    <CheckListIcon />
                </Badge>
                <Typography
                    variant="h6"
                    sx={{ ml: 3, flexGrow: 1 }}>
                    CheckList
                </Typography>
                <>
                    {mode === "dark" ? (
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                setMode("light")
                            }}>
                            <LightModeIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                setMode("dark")
                            }}>
                            <DarkModeIcon />
                        </IconButton>
                    )}

                    <IconButton
                        color="inherit"
                        onClick={clear}>
                        <ClearAllIcon />
                    </IconButton>
                    
                </>
            </Toolbar>
        </AppBar>
    )
}