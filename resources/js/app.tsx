import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import muiTheme from "./mui-style"
const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const defaultTheme = createTheme(muiTheme);
void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: "#4B5563",
    },
    setup({ el, App, props }) {
        if (!el) {
            return;
        }

        createRoot(el).render(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={defaultTheme}>
                    <CssBaseline></CssBaseline>
                    <App {...props} />
                </ThemeProvider>
            </LocalizationProvider>,
        );
    },
});
