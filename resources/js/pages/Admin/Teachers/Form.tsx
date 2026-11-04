import { Button, Stack, TextField } from '@mui/material';
import type { FormEvent } from 'react';

type Props = { form: any; onSubmit: (event: FormEvent) => void; mode: 'create' | 'edit' };

export default function TeacherForm({ form, onSubmit, mode }: Props) {
    return <Stack component="form" spacing={2} onSubmit={onSubmit}>
        <TextField label="Name" value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} error={Boolean(form.errors.name)} helperText={form.errors.name} />
        <TextField label="Mobile Phone" value={form.data.mobile_phone} onChange={(event) => form.setData('mobile_phone', event.target.value)} error={Boolean(form.errors.mobile_phone)} helperText={form.errors.mobile_phone} />
        <Button type="submit" variant="contained" disabled={form.processing}>{mode === 'create' ? 'Simpan' : 'Update'}</Button>
    </Stack>;
}
