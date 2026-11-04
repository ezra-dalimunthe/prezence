import { router } from "@inertiajs/react";
import { Button, Paper, Stack, Typography } from "@mui/material";

interface AdminPayload {
    numberOfStudents: number;
    numberOfTeachers: number;
    numberOfStaffs: number;
}

export default function AdminDashboard({ payload }: { payload: AdminPayload }) {
    return (
        <Stack spacing={2}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4">Admin Dashboard</Typography>
                <Typography sx={{ mt: 1 }}>
                    Jumlah Siswa: {payload.numberOfStudents}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    Jumlah Guru: {payload.numberOfTeachers}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    Jumlah Staf: {payload.numberOfStaffs}
                </Typography>
            </Paper>
        </Stack>
    );
}
