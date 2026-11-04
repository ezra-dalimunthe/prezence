import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { usePage, router } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isAdmin = user?.role === 'admin';

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Prezence
                    </Typography>
                    {user && (
                        <Button
                            color="inherit"
                            onClick={() => router.visit('/')}
                        >
                            Dashboard
                        </Button>
                    )}

                    {isAdmin && (
                        <>
                            <Button color="inherit" onClick={() => router.visit('/admin/teachers')}>
                                Teachers
                            </Button>
                            <Button color="inherit" onClick={() => router.visit('/admin/students')}>
                                Students
                            </Button>
                            <Button color="inherit" onClick={() => router.visit('/admin/staff')}>
                                Staff
                            </Button>
                        </>
                    )}

                    <Button
                        color="inherit"
                        onClick={() => router.visit('/about')}
                    >
                        About
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => router.visit('/guide')}
                    >
                        Guide
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => router.visit('/contact')}
                    >
                        Contact
                    </Button>

                    {user ? (
                        <Button
                            color="inherit"
                            onClick={() => router.post('/logout')}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            color="inherit"
                            onClick={() => router.visit('/login')}
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Container sx={{ py: 4 }}>{children}</Container>
        </>
    );
}
