import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ClassRoomForm from './Form';

export default function ClassRoomCreate() {
    const form = useForm({ name: '', level: 'X' });
    function submit(event: FormEvent) { event.preventDefault(); form.post('/admin/class-rooms'); }
    return <><Head title="Tambah ClassRoom" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Tambah ClassRoom</Typography><ClassRoomForm form={form} onSubmit={submit} mode="create" /></Paper></MainLayout></>;
}
