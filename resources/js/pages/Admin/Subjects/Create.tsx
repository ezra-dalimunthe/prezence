import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import SubjectForm from './Form';

export default function SubjectCreate() {
    const form = useForm({ name: '' });
    function submit(event: FormEvent) { event.preventDefault(); form.post('/admin/subjects'); }
    return <><Head title="Tambah Subject" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Tambah Subject</Typography><SubjectForm form={form} onSubmit={submit} mode="create" /></Paper></MainLayout></>;
}
