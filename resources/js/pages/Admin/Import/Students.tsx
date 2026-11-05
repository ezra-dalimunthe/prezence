import { Head, useForm, usePage } from '@inertiajs/react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ImportResult, { type ImportResultData } from './Result';

type PageProps = { flash?: { importResult?: ImportResultData } };

export default function ImportStudents() {
    const { flash } = usePage<PageProps>().props;
    const form = useForm<{ file: File | null }>({ file: null });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/admin/import/students', { forceFormData: true });
    }

    return <><Head title="Import Students" /><MainLayout><Stack spacing={3}><Paper sx={{ maxWidth: 600, p: 4 }}><Stack component="form" spacing={2} onSubmit={submit}><Typography variant="h4">Import Students</Typography><MuiFileInput size="small" label="File CSV" value={form.data.file} onChange={(file) => form.setData('file', file)} error={Boolean(form.errors.file)} helperText={form.errors.file ?? 'Pilih file CSV maksimal 2 MB'} /><Box sx={{ width: '100px' }}><Button size="small" fullWidth type="submit" variant="contained" disabled={form.processing}>Upload dan Import</Button></Box></Stack></Paper><ImportResult result={flash?.importResult} /></Stack></MainLayout></>;
}
