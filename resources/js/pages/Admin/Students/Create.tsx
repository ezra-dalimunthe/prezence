import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import StudentForm from './Form';

export default function StudentCreate({ classRooms }: { classRooms: { id: number; name: string; level: string }[] }) {
    const form = useForm({ name: '', nis: '', gender: '', birth_date: '', birth_place: '', class_id: '' });
    function submit(event: FormEvent) { event.preventDefault(); form.post('/admin/students'); }
    return <><Head title="Tambah Student" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Tambah Student</Typography><StudentForm form={form} classRooms={classRooms} onSubmit={submit} mode="create" /></Paper></MainLayout></>;
}
