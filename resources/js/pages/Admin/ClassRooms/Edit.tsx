import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ClassRoomForm from './Form';

export default function ClassRoomEdit({ classRoom }: { classRoom: { id: number; name: string; level: string } }) {
    const form = useForm({ name: classRoom.name, level: classRoom.level });
    function submit(event: FormEvent) { event.preventDefault(); form.put(`/admin/class-rooms/${classRoom.id}`); }
    return <><Head title="Edit ClassRoom" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Edit ClassRoom</Typography><ClassRoomForm form={form} onSubmit={submit} mode="edit" /></Paper></MainLayout></>;
}
