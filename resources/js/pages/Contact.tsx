import { Paper, Typography } from '@mui/material';
import MainLayout from '@/layouts/MainLayout';

export default function About() {
    return (
        <MainLayout>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Contact
                </Typography>
                <Typography>developer: support@smk1galang.sch.id</Typography>
            </Paper>
        </MainLayout>
    );
}
