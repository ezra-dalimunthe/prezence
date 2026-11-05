import { Head, router } from '@inertiajs/react';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import CreateAccountModal from './CreateAccountModal';

type Staff = { id: number; name: string; position: string; user?: { email: string; role: string } | null };
type Pagination<T> = { data: T[]; current_page: number; per_page: number; total: number };

export default function StaffIndex({ staff, createAccountFor = null }: { staff: Pagination<Staff>; createAccountFor?: number | null }) {
    const [accountFor, setAccountFor] = useState<number | null>(createAccountFor);
    function changePage(page: number) { router.get('/admin/staff', { page: page + 1 }, { preserveState: true, preserveScroll: true }); }
    return <><Head title="Staff" /><MainLayout><Stack spacing={2}><Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}><Typography variant="h4">Staff</Typography><Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={() => router.visit('/admin/staff/create')} variant="contained">Tambah Staff</Button></Box></Stack><Paper><Table><TableHead><TableRow><TableCell>Name</TableCell><TableCell>Position</TableCell><TableCell>Role</TableCell><TableCell>Email</TableCell><TableCell>Action</TableCell></TableRow></TableHead><TableBody>{staff.data.map((item) => <TableRow key={item.id}><TableCell>{item.name}</TableCell><TableCell>{item.position}</TableCell><TableCell>{item.user?.role ?? '-'}</TableCell><TableCell>{item.user?.email ?? '-'}</TableCell><TableCell><Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={() => router.visit(`/admin/staff/${item.id}/edit`)}>Edit</Button></Box>{!item.user && <Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={() => setAccountFor(item.id)}>Create account</Button></Box>}</TableCell></TableRow>)}</TableBody></Table><TablePagination component="div" count={staff.total} page={staff.current_page - 1} rowsPerPage={staff.per_page} rowsPerPageOptions={[staff.per_page]} onPageChange={(_, page) => changePage(page)} labelRowsPerPage="Data per halaman" /></Paper></Stack></MainLayout><CreateAccountModal staffId={accountFor} onClose={() => setAccountFor(null)} /></>;
}
