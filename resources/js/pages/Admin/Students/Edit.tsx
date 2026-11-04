import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import StudentForm from './Form';

type Student = { id: number; name: string; nis: string; gender: string; birth_date: string; birth_place: string; class_id: number };
export default function StudentEdit({ student, classRooms }: { student: Student; classRooms: { id: number; name: string; level: string }[] }) {
    const form = useForm({ name: student.name, nis: student.nis, gender: student.gender, birth_date: student.birth_date?.slice(0, 10) ?? '', birth_place: student.birth_place, class_id: String(student.class_id) });
    function submit(event: FormEvent) { event.preventDefault(); form.put(`/admin/students/${student.id}`); }
    return <><Head title="Edit Student" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Edit Student</Typography><StudentForm form={form} classRooms={classRooms} onSubmit={submit} mode="edit" /></Paper></MainLayout></>;
}
