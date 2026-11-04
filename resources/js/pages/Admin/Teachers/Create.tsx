import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import TeacherForm from './Form';

export default function TeacherCreate() {
    const form = useForm({ name: '', mobile_phone: '' });
    function submit(event: FormEvent) { event.preventDefault(); form.post('/admin/teachers'); }
    return <><Head title="Tambah Teacher" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Tambah Teacher</Typography><TeacherForm form={form} onSubmit={submit} mode="create" /></Paper></MainLayout></>;
}
