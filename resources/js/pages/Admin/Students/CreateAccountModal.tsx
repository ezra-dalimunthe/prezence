import { useForm } from "@inertiajs/react";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import type { FormEvent } from "react";

export default function CreateAccountModal({
    studentId,
    onClose,
}: {
    studentId: number | null;
    onClose: () => void;
}) {
    const form = useForm({ email: "" });
    function submit(event: FormEvent) {
        event.preventDefault();
        if (!studentId) return;
        form.post(`/admin/students/${studentId}/account`, {
            onSuccess: () => {
                form.reset();
                onClose();
            },
        });
    }
    return (
        <Dialog
            open={studentId !== null}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Create Student Account</DialogTitle>
            <DialogContent>
                {form.errors.email && (
                    <Alert severity="error">{form.errors.email}</Alert>
                )}
                <TextField
                    size="small"
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="Email"
                    type="email"
                    value={form.data.email}
                    onChange={(e) => form.setData("email", e.target.value)}
                    error={Boolean(form.errors.email)}
                    helperText={form.errors.email}
                />
            </DialogContent>
            <DialogActions>
                <Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={onClose}>Batal</Button></Box>
                <Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={submit} variant="contained" disabled={form.processing}>Create account</Button></Box>
            </DialogActions>
        </Dialog>
    );
}
