import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import TeachingAssignmentForm from './Form';

type Option = { id: number; name: string; level?: string };
type Assignment = { id: number; teacher_id: number; subject_id: number; class_id: number };
export default function TeachingAssignmentEdit({ assignment, teachers, subjects, classRooms }: { assignment: Assignment; teachers: Option[]; subjects: Option[]; classRooms: Option[] }) {
    const form = useForm({ teacher_id: String(assignment.teacher_id), subject_id: String(assignment.subject_id), class_id: String(assignment.class_id) });
    function submit(event: FormEvent) { event.preventDefault(); form.put(`/admin/teaching-assignments/${assignment.id}`); }
    return <><Head title="Edit TeachingAssignment" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Edit TeachingAssignment</Typography><TeachingAssignmentForm form={form} teachers={teachers} subjects={subjects} classRooms={classRooms} onSubmit={submit} mode="edit" /></Paper></MainLayout></>;
}
