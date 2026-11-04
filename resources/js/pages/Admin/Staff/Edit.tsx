import { Head, useForm } from '@inertiajs/react';
import { Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import StaffForm from './Form';

type Staff = { id: number; name: string; position: string };
export default function StaffEdit({ staff }: { staff: Staff }) {
    const form = useForm({ name: staff.name, position: staff.position });
    function submit(event: FormEvent) { event.preventDefault(); form.put(`/admin/staff/${staff.id}`); }
    return <><Head title="Edit Staff" /><MainLayout><Paper sx={{ maxWidth: 600, p: 4 }}><Typography variant="h4" sx={{ mb: 3 }}>Edit Staff</Typography><StaffForm form={form} onSubmit={submit} mode="edit" /></Paper></MainLayout></>;
}
