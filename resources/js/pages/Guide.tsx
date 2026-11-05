import { Paper, Typography } from "@mui/material";
import MainLayout from "@/layouts/MainLayout";

export default function About() {
    return (
        <MainLayout>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Guide
                </Typography>
                <Typography>
                    Prezence adalah aplikasi pembelajaran untuk mengelola
                    presensi siswa.
                </Typography>
                <Typography>
                    Aplikasi ini mengikuti PRD dan SRS yang ada pada repo{" "}
                    <Typography
                        sx={{ color: "blue", mt: 2 }}
                        component={"a"}
                        href="https://github.com/ezra-dalimunthe/prezence-tutorial"
                    >
                        Prezence Tutorial
                    </Typography>
                </Typography>
            </Paper>
        </MainLayout>
    );
}
