import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import StaffForm from './Form';

export default function StaffCreate() {
    const form = useForm({ name: '', position: '' });
    function submit(event: FormEvent) { event.preventDefault(); form.post('/admin/staff'); }
    return <><Head title="Tambah Staff" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Tambah Staff</Typography><StaffForm form={form} onSubmit={submit} mode="create" /></Paper></MainLayout></>;
}
