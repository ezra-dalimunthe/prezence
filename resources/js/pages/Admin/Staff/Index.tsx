import { Head, router } from '@inertiajs/react';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import CreateAccountModal from './CreateAccountModal';

type Staff = { id: number; name: string; position: string; user?: { email: string; role: string } | null };
export default function StaffIndex({ staff, createAccountFor = null }: { staff: Staff[]; createAccountFor?: number | null }) {
    const [accountFor, setAccountFor] = useState<number | null>(createAccountFor);
    return <><Head title="Staff" /><MainLayout><Stack spacing={2}><Stack direction="row" sx={{ justifyContent: 'space-between' }}><Typography variant="h4">Staff</Typography><Button onClick={() => router.visit('/admin/staff/create')} variant="contained">Tambah Staff</Button></Stack><Paper><Table><TableHead><TableRow><TableCell>Name</TableCell><TableCell>Position</TableCell><TableCell>Role</TableCell><TableCell>Email</TableCell><TableCell>Action</TableCell></TableRow></TableHead><TableBody>{staff.map((item) => <TableRow key={item.id}><TableCell>{item.name}</TableCell><TableCell>{item.position}</TableCell><TableCell>{item.user?.role ?? '-'}</TableCell><TableCell>{item.user?.email ?? '-'}</TableCell><TableCell><Button onClick={() => router.visit(`/admin/staff/${item.id}/edit`)}>Edit</Button>{!item.user && <Button onClick={() => setAccountFor(item.id)}>Create account</Button>}</TableCell></TableRow>)}</TableBody></Table></Paper></Stack></MainLayout><CreateAccountModal staffId={accountFor} onClose={() => setAccountFor(null)} /></>;
}
