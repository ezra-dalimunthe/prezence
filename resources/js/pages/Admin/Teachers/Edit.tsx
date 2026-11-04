import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import TeacherForm from './Form';

type Teacher = { id: number; name: string; mobile_phone: string };

export default function TeacherEdit({ teacher }: { teacher: Teacher }) {
    const form = useForm({ name: teacher.name, mobile_phone: teacher.mobile_phone });
    function submit(event: FormEvent) { event.preventDefault(); form.put(`/admin/teachers/${teacher.id}`); }
    return <><Head title="Edit Teacher" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Edit Teacher</Typography><TeacherForm form={form} onSubmit={submit} mode="edit" /></Paper></MainLayout></>;
}
