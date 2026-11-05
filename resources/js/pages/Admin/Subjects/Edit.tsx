import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import SubjectForm from './Form';

export default function SubjectEdit({ subject }: { subject: { id: number; name: string } }) {
    const form = useForm({ name: subject.name });
    function submit(event: FormEvent) { event.preventDefault(); form.put(`/admin/subjects/${subject.id}`); }
    return <><Head title="Edit Subject" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Edit Subject</Typography><SubjectForm form={form} onSubmit={submit} mode="edit" /></Paper></MainLayout></>;
}
