import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
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
                    {user && <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/')}>Dashboard</Button></Box>}

                    {isAdmin && (
                        <>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/teachers')}>
                                Teachers
                            </Button></Box>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/students')}>
                                Students
                            </Button></Box>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/staff')}>
                                Staff
                            </Button></Box>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/subjects')}>
                                Subjects
                            </Button></Box>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/class-rooms')}>
                                ClassRooms
                            </Button></Box>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/teaching-assignments')}>
                                Assignments
                            </Button></Box>
                        </>
                    )}

                    <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/about')}>About</Button></Box>
                    <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/guide')}>Guide</Button></Box>
                    <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/contact')}>Contact</Button></Box>

                    {user ? (
                        <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.post('/logout')}>Logout</Button></Box>
                    ) : (
                        <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/login')}>Login</Button></Box>
                    )}
                </Toolbar>
            </AppBar>

            <Container sx={{ py: 4 }}>{children}</Container>
        </>
    );
}
