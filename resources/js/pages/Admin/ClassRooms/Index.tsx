import { Head, router } from '@inertiajs/react';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import MainLayout from '@/layouts/MainLayout';

type ClassRoom = { id: number; name: string; level: string };
type Pagination<T> = { data: T[]; current_page: number; per_page: number; total: number };
export default function ClassRoomIndex({ classRooms }: { classRooms: Pagination<ClassRoom> }) {
    function changePage(page: number) { router.get('/admin/class-rooms', { page: page + 1 }, { preserveState: true, preserveScroll: true }); }
    function destroy(id: number) { if (window.confirm('Hapus ClassRoom ini?')) router.delete(`/admin/class-rooms/${id}`); }
    return <><Head title="ClassRooms" /><MainLayout><Stack spacing={2}><Stack direction="row" sx={{ justifyContent: 'space-between' }}><Typography variant="h4">ClassRooms</Typography><Box sx={{ width: '100px' }}><Button size="small" fullWidth variant="contained" onClick={() => router.visit('/admin/class-rooms/create')}>Tambah ClassRoom</Button></Box></Stack><Paper><Table><TableHead><TableRow><TableCell>Name</TableCell><TableCell>Level</TableCell><TableCell>Action</TableCell></TableRow></TableHead><TableBody>{classRooms.data.map((classRoom) => <TableRow key={classRoom.id}><TableCell>{classRoom.name}</TableCell><TableCell>{classRoom.level}</TableCell><TableCell><Box sx={{ width: '100px' }}><Button size="small" fullWidth onClick={() => router.visit(`/admin/class-rooms/${classRoom.id}/edit`)}>Edit</Button></Box><Box sx={{ width: '100px' }}><Button size="small" fullWidth color="error" onClick={() => destroy(classRoom.id)}>Delete</Button></Box></TableCell></TableRow>)}</TableBody></Table><TablePagination component="div" count={classRooms.total} page={classRooms.current_page - 1} rowsPerPage={classRooms.per_page} rowsPerPageOptions={[classRooms.per_page]} onPageChange={(_, page) => changePage(page)} labelRowsPerPage="Data per halaman" /></Paper></Stack></MainLayout></>;
}
