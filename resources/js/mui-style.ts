import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        tableHeader: Palette["primary"];
    }

    interface PaletteOptions {
        tableHeader?: PaletteOptions["primary"];
    }
}

const muiTheme = createTheme({
    palette: {
        tableHeader: {
            main: "#1976d2",
            contrastText: "#ffffff",
        },
    },
    components: {
        MuiTableContainer: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: 6,
                    border: "0.4px solid",
                    boxShadow: "inherit",
                    borderColor: theme.palette.text.disabled,
                }),
            },
        },
        MuiTable: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.background.default,
                    tableLayout: "fixed",
                    width: "100%",
                }),
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: 6,
                    backgroundColor: theme.palette.tableHeader.main,
                    "& .MuiTableCell-root": {
                        color: theme.palette.tableHeader.contrastText,
                        fontWeight: 600,
                    },
                }),
            },
        },
    },
});

export default muiTheme;
