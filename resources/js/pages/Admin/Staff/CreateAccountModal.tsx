import { useForm } from "@inertiajs/react";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import type { FormEvent } from "react";

export default function CreateAccountModal({
    staffId,
    onClose,
}: {
    staffId: number | null;
    onClose: () => void;
}) {
    const form = useForm({ email: "", role: "report_viewer" });
    function submit(event: FormEvent) {
        event.preventDefault();
        if (!staffId) return;
        form.post(`/admin/staff/${staffId}/account`, {
            onSuccess: () => {
                form.reset();
                onClose();
            },
        });
    }
    return (
        <Dialog
            open={staffId !== null}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Create Staff Account</DialogTitle>
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
                <Select
                    size="small"
                    fullWidth
                    margin="dense"
                    value={form.data.role}
                    onChange={(e) => form.setData("role", e.target.value)}
                >
                    <MenuItem value="admin">admin</MenuItem>
                    <MenuItem value="report_viewer">report_viewer</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={onClose}>Batal</Button></Box>
                <Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={submit} variant="contained" disabled={form.processing}>Create account</Button></Box>
            </DialogActions>
        </Dialog>
    );
}
