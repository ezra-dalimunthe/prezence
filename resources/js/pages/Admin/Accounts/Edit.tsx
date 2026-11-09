import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Alert, Box, Button, FormControl, FormLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { type FormEvent } from "react";
import MainLayout from "@/layouts/MainLayout";

type Props = {
    account: { id: number; email: string; role: string; is_active: boolean };
    profile: { name: string; type: "teacher" | "student" | "staff" };
    roles: string[];
};
type PageProps = Props & { flash?: { success?: string } };

export default function AccountEdit({ account, profile, roles }: Props) {
    const { flash } = usePage<PageProps>().props;
    const form = useForm({ email: account.email, role: account.role, is_active: account.is_active });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.put(`/admin/accounts/${account.id}`);
    }

    function resetPassword() {
        if (window.confirm("Reset password dan kirim credential baru melalui email?")) {
            router.post(`/admin/accounts/${account.id}/reset-password`);
        }
    }

    return (
        <>
            <Head title="Edit Account" />
            <MainLayout>
                <Stack spacing={2}>
                    <Typography variant="h4">Edit Account</Typography>
                    {flash?.success && <Alert severity="success">{flash.success}</Alert>}
                    <Paper sx={{ p: 3 }}>
                        <Stack spacing={2} component="form" onSubmit={submit}>
                            <Typography variant="h6">Profile</Typography>
                            <TextField label="Name" value={profile.name} size="small" disabled />
                            <TextField label="Profile Type" value={profile.type} size="small" disabled />
                            <Typography variant="h6" sx={{ mt: 2 }}>Account</Typography>
                            <TextField label="Email" type="email" value={form.data.email} onChange={(event) => form.setData("email", event.target.value)} error={Boolean(form.errors.email)} helperText={form.errors.email} size="small" />
                            <FormControl size="small">
                                <FormLabel>Role</FormLabel>
                                <Select value={form.data.role} onChange={(event) => form.setData("role", event.target.value)}>
                                    {roles.map((role) => <MenuItem key={role} value={role}>{role}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl size="small">
                                <FormLabel>Status</FormLabel>
                                <Select value={form.data.is_active ? "active" : "inactive"} onChange={(event) => form.setData("is_active", event.target.value === "active")}>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                            {form.errors.role && <Alert severity="error">{form.errors.role}</Alert>}
                            {form.errors.is_active && <Alert severity="error">{form.errors.is_active}</Alert>}
                            <Box sx={{ width: "120px" }}><Button size="small" fullWidth type="submit" variant="contained" disabled={form.processing}>Simpan</Button></Box>
                        </Stack>
                    </Paper>
                    <Paper sx={{ p: 3 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6">Reset Password</Typography>
                            <Typography>Sistem akan membuat temporary password baru dan mengirimkannya ke email account.</Typography>
                            <Box sx={{ width: "180px" }}><Button size="small" fullWidth variant="outlined" onClick={resetPassword}>Reset Password</Button></Box>
                        </Stack>
                    </Paper>
                </Stack>
            </MainLayout>
        </>
    );
}
