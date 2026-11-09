import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { usePage, router } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isAdmin = user?.role === 'admin';
    const isTeacher = user?.role === 'teacher';

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
                                Guru
                            </Button></Box>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/students')}>
                                Siswa
                            </Button></Box>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/staff')}>
                                Staf
                            </Button></Box>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/subjects')}>
                                Mapel
                            </Button></Box>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/class-rooms')}>
                                Kelas
                            </Button></Box>
                            <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/admin/teaching-assignments')}>
                                Penugasan
                            </Button></Box>
                        </>
                    )}

                    {isTeacher && <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/teacher/reports')}>Laporan</Button></Box>}

                    {user && <Box sx={{ width: '100px' }}><Button size="small" fullWidth color="inherit" onClick={() => router.visit('/profile')}>Profil</Button></Box>}

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
