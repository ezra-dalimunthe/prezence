import { router } from '@inertiajs/react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

type Assignment = { id: number; subject: { name: string }; class_room: { name: string; level: string } };
export default function TeacherDashboard({ payload }: { payload: { assignments: Assignment[] } }) {
    return <Stack spacing={2}><Paper sx={{ p: 4 }}><Typography variant="h4">Teacher Dashboard</Typography><Typography sx={{ mt: 1 }}>TeachingAssignment saya</Typography><Stack spacing={1} sx={{ mt: 2 }}>{payload.assignments.map((assignment) => <Box key={assignment.id}><Button size="small" variant="outlined" onClick={() => router.visit(`/teacher/attendances?assignment_id=${assignment.id}`)}>{assignment.subject.name} — {assignment.class_room.level} {assignment.class_room.name}</Button></Box>)}</Stack></Paper></Stack>;
}
