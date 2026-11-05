import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import TeachingAssignmentForm from './Form';

type Option = { id: number; name: string; level?: string };
export default function TeachingAssignmentCreate({ teachers, subjects, classRooms }: { teachers: Option[]; subjects: Option[]; classRooms: Option[] }) {
    const form = useForm({ teacher_id: '', subject_id: '', class_id: '' });
    function submit(event: FormEvent) { event.preventDefault(); form.post('/admin/teaching-assignments'); }
    return <><Head title="Tambah TeachingAssignment" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Tambah TeachingAssignment</Typography><TeachingAssignmentForm form={form} teachers={teachers} subjects={subjects} classRooms={classRooms} onSubmit={submit} mode="create" /></Paper></MainLayout></>;
}
