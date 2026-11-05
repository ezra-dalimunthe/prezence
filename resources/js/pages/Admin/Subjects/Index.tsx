import { Head, router } from '@inertiajs/react';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import MainLayout from '@/layouts/MainLayout';
type Subject = { id: number; name: string };
type Pagination<T> = { data: T[]; current_page: number; per_page: number; total: number };
export default function SubjectIndex({ subjects }: { subjects: Pagination<Subject> }) {
    function changePage(page: number) { router.get('/admin/subjects', { page: page + 1 }, { preserveState: true, preserveScroll: true }); }
    function destroy(id: number) { if (window.confirm('Hapus Subject ini?')) router.delete(`/admin/subjects/${id}`); }
    return <><Head title="Subjects" /><MainLayout><Stack spacing={2}><Stack direction="row" sx={{ justifyContent: 'space-between' }}><Typography variant="h4">Subjects</Typography><Box sx={{ width: '100px' }}><Button size="small" fullWidth variant="contained" onClick={() => router.visit('/admin/subjects/create')}>Tambah Subject</Button></Box></Stack><Paper><Table><TableHead><TableRow><TableCell>Name</TableCell><TableCell>Action</TableCell></TableRow></TableHead><TableBody>{subjects.data.map((subject) => <TableRow key={subject.id}><TableCell>{subject.name}</TableCell><TableCell><Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={() => router.visit(`/admin/subjects/${subject.id}/edit`)}>Edit</Button></Box><Box sx={{ width: '100px' }}><Button size="small" fullWidth color="error" onClick={() => destroy(subject.id)}>Delete</Button></Box></TableCell></TableRow>)}</TableBody></Table><TablePagination component="div" count={subjects.total} page={subjects.current_page - 1} rowsPerPage={subjects.per_page} rowsPerPageOptions={[subjects.per_page]} onPageChange={(_, page) => changePage(page)} labelRowsPerPage="Data per halaman" /></Paper></Stack></MainLayout></>;
}
