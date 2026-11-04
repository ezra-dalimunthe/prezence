import { Head, router } from '@inertiajs/react';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import CreateAccountModal from './CreateAccountModal';

type Student = { id: number; name: string; nis: string; class_room?: { name: string } | null; user?: { email: string } | null };
export default function StudentIndex({ students, createAccountFor = null }: { students: Student[]; createAccountFor?: number | null }) {
    const [accountFor, setAccountFor] = useState<number | null>(createAccountFor);
    return <><Head title="Students" /><MainLayout><Stack spacing={2}><Stack direction="row" sx={{ justifyContent: 'space-between' }}><Typography variant="h4">Students</Typography><Button onClick={() => router.visit('/admin/students/create')} variant="contained">Tambah Student</Button></Stack><Paper><Table><TableHead><TableRow><TableCell>Name</TableCell><TableCell>NIS</TableCell><TableCell>ClassRoom</TableCell><TableCell>Email</TableCell><TableCell>Action</TableCell></TableRow></TableHead><TableBody>{students.map((student) => <TableRow key={student.id}><TableCell>{student.name}</TableCell><TableCell>{student.nis}</TableCell><TableCell>{student.class_room?.name ?? '-'}</TableCell><TableCell>{student.user?.email ?? '-'}</TableCell><TableCell><Button onClick={() => router.visit(`/admin/students/${student.id}/edit`)}>Edit</Button>{!student.user && <Button onClick={() => setAccountFor(student.id)}>Create account</Button>}</TableCell></TableRow>)}</TableBody></Table></Paper></Stack></MainLayout><CreateAccountModal studentId={accountFor} onClose={() => setAccountFor(null)} /></>;
}
