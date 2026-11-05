import { Box, Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import type { FormEvent } from 'react';

export default function ClassRoomForm({ form, onSubmit, mode }: { form: any; onSubmit: (event: FormEvent) => void; mode: 'create' | 'edit' }) {
    return <Stack component="form" spacing={2} onSubmit={onSubmit}><TextField size="small" label="Name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} error={Boolean(form.errors.name)} helperText={form.errors.name} /><Select size="small" value={form.data.level} onChange={(e) => form.setData('level', e.target.value)} error={Boolean(form.errors.level)}><MenuItem value="X">X</MenuItem><MenuItem value="XI">XI</MenuItem><MenuItem value="XII">XII</MenuItem></Select><Box sx={{ width: '100px' }}><Button size="small" fullWidth type="submit" variant="contained" disabled={form.processing}>{mode === 'create' ? 'Simpan' : 'Update'}</Button></Box></Stack>;
}
