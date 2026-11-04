import { Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import type { FormEvent } from 'react';

type Props = { form: any; classRooms: { id: number; name: string; level: string }[]; onSubmit: (event: FormEvent) => void; mode: 'create' | 'edit' };

export default function StudentForm({ form, classRooms, onSubmit, mode }: Props) {
    return <Stack component="form" spacing={2} onSubmit={onSubmit}>
        <TextField label="Name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} error={Boolean(form.errors.name)} helperText={form.errors.name} />
        <TextField label="NIS" value={form.data.nis} onChange={(e) => form.setData('nis', e.target.value)} error={Boolean(form.errors.nis)} helperText={form.errors.nis} />
        <Select displayEmpty value={form.data.gender} onChange={(e) => form.setData('gender', e.target.value)}>{['', 'male', 'female'].map((gender) => <MenuItem key={gender} value={gender}>{gender || 'Pilih Gender'}</MenuItem>)}</Select>
        <TextField type="date" label="Birth Date" value={form.data.birth_date} onChange={(e) => form.setData('birth_date', e.target.value)} error={Boolean(form.errors.birth_date)} helperText={form.errors.birth_date} InputLabelProps={{ shrink: true }} />
        <TextField label="Birth Place" value={form.data.birth_place} onChange={(e) => form.setData('birth_place', e.target.value)} error={Boolean(form.errors.birth_place)} helperText={form.errors.birth_place} />
        <Select displayEmpty value={form.data.class_id} onChange={(e) => form.setData('class_id', e.target.value)}><MenuItem value="">Pilih ClassRoom</MenuItem>{classRooms.map((room) => <MenuItem key={room.id} value={room.id}>{room.level} - {room.name}</MenuItem>)}</Select>
        <Button type="submit" variant="contained" disabled={form.processing}>{mode === 'create' ? 'Simpan' : 'Update'}</Button>
    </Stack>;
}
