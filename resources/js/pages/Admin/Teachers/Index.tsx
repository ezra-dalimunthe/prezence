import { Head, router } from '@inertiajs/react';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import CreateAccountModal from './CreateAccountModal';

type Teacher = { id: number; name: string; mobile_phone: string; user?: { email: string } | null };

export default function TeacherIndex({ teachers, createAccountFor = null }: { teachers: Teacher[]; createAccountFor?: number | null }) {
    const [accountFor, setAccountFor] = useState<number | null>(createAccountFor);
    return <><Head title="Teachers" /><MainLayout><Stack spacing={2}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}><Typography variant="h4">Teachers</Typography><Button onClick={() => router.visit('/admin/teachers/create')} variant="contained">Tambah Teacher</Button></Stack>
        <Paper><Table><TableHead><TableRow><TableCell>Name</TableCell><TableCell>Mobile Phone</TableCell><TableCell>Email</TableCell><TableCell>Action</TableCell></TableRow></TableHead><TableBody>
            {teachers.map((teacher) => <TableRow key={teacher.id}><TableCell>{teacher.name}</TableCell><TableCell>{teacher.mobile_phone}</TableCell><TableCell>{teacher.user?.email ?? '-'}</TableCell><TableCell><Button onClick={() => router.visit(`/admin/teachers/${teacher.id}/edit`)}>Edit</Button>{!teacher.user && <Button onClick={() => setAccountFor(teacher.id)}>Create account</Button>}</TableCell></TableRow>)}
        </TableBody></Table></Paper>
    </Stack></MainLayout><CreateAccountModal teacherId={accountFor} onClose={() => setAccountFor(null)} /></>;
}
