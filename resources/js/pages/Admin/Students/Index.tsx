import { Head, router } from '@inertiajs/react';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import CreateAccountModal from './CreateAccountModal';

type Student = { id: number; name: string; nis: string; class_room?: { name: string } | null; user?: { email: string } | null };
type Pagination<T> = { data: T[]; current_page: number; per_page: number; total: number };

export default function StudentIndex({ students, createAccountFor = null }: { students: Pagination<Student>; createAccountFor?: number | null }) {
    const [accountFor, setAccountFor] = useState<number | null>(createAccountFor);
    function changePage(page: number) { router.get('/admin/students', { page: page + 1 }, { preserveState: true, preserveScroll: true }); }
    return <><Head title="Students" /><MainLayout><Stack spacing={2}><Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}><Typography variant="h4">Students</Typography><Stack direction="row" spacing={1}><Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={() => router.visit('/admin/students/create')} variant="contained">Tambah Student</Button></Box><Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={() => router.visit('/admin/import/students')} variant="outlined">Import Student</Button></Box></Stack></Stack><Paper><Table><TableHead><TableRow><TableCell>Name</TableCell><TableCell>NIS</TableCell><TableCell>ClassRoom</TableCell><TableCell>Email</TableCell><TableCell>Action</TableCell></TableRow></TableHead><TableBody>{students.data.map((student) => <TableRow key={student.id}><TableCell>{student.name}</TableCell><TableCell>{student.nis}</TableCell><TableCell>{student.class_room?.name ?? '-'}</TableCell><TableCell>{student.user?.email ?? '-'}</TableCell><TableCell><Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={() => router.visit(`/admin/students/${student.id}/edit`)}>Edit</Button></Box>{!student.user && <Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={() => setAccountFor(student.id)}>Create account</Button></Box>}</TableCell></TableRow>)}</TableBody></Table><TablePagination component="div" count={students.total} page={students.current_page - 1} rowsPerPage={students.per_page} rowsPerPageOptions={[students.per_page]} onPageChange={(_, page) => changePage(page)} labelRowsPerPage="Data per halaman" /></Paper></Stack></MainLayout><CreateAccountModal studentId={accountFor} onClose={() => setAccountFor(null)} /></>;
}
