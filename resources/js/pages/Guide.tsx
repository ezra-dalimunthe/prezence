import { Paper, Typography } from '@mui/material';
import MainLayout from '@/layouts/MainLayout';

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
            </Paper>
        </MainLayout>
    );
}
