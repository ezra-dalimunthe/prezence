import { useForm } from '@inertiajs/react';
import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import MainLayout from '@/layouts/MainLayout';
import type { FormEvent } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/login');
    }

    return (
        <MainLayout>
            <Paper sx={{ maxWidth: 480, mx: 'auto', p: 4 }}>
                <Box sx={{ mb: 3 }}>Welcome to Prezence!</Box>
                <Stack
                    component="form"
                    spacing={2}
                    onSubmit={submit}
                    noValidate
                >
                    <Typography variant="h4">Login</Typography>

                    {errors.email && (
                        <Alert severity="error">{errors.email}</Alert>
                    )}

                    <TextField
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(event) =>
                            setData('email', event.target.value)
                        }
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        required
                    />

                    <TextField
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={(event) =>
                            setData('password', event.target.value)
                        }
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={processing}
                    >
                        {processing ? 'Memproses...' : 'Login'}
                    </Button>
                </Stack>
            </Paper>
        </MainLayout>
    );
}
