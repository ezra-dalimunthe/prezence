import { useForm } from '@inertiajs/react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import type { FormEvent } from 'react';

type Props = { teacherId: number | null; onClose: () => void };

export default function CreateAccountModal({ teacherId, onClose }: Props) {
    const form = useForm({ email: '' });
    function submit(event: FormEvent) {
        event.preventDefault();
        if (!teacherId) return;
        form.post(`/admin/teachers/${teacherId}/account`, { onSuccess: () => { form.reset(); onClose(); } });
    }
    return <Dialog open={teacherId !== null} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Teacher Account</DialogTitle>
        <DialogContent>
            {form.errors.email && <Alert severity="error">{form.errors.email}</Alert>}
            <TextField autoFocus fullWidth margin="dense" label="Email" type="email" value={form.data.email} onChange={(event) => form.setData('email', event.target.value)} error={Boolean(form.errors.email)} helperText={form.errors.email} />
        </DialogContent>
        <DialogActions><Button onClick={onClose}>Batal</Button><Button onClick={submit} variant="contained" disabled={form.processing}>Create account</Button></DialogActions>
    </Dialog>;
}
