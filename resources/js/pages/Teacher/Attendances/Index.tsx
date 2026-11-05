import { Head, useForm } from '@inertiajs/react';
import { Button, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { FormEvent } from 'react';
import MainLayout from '@/layouts/MainLayout';

type Assignment = { id: number; subject: { name: string }; class_room: { name: string; level: string } };
type Student = { id: number; name: string; nis: string };
type Props = { assignments: Assignment[]; selectedAssignmentId?: number; students: Student[]; attendanceDate: string };

export default function AttendanceIndex({ assignments, selectedAssignmentId, students, attendanceDate }: Props) {
    const form = useForm<Record<string, any>>({
        teaching_assignment_id: selectedAssignmentId ? String(selectedAssignmentId) : '',
        attendance_date: attendanceDate || dayjs().format('YYYY-MM-DD'),
        attendances: Object.fromEntries(students.map((student) => [student.id, 'present'])),
    });

    function selectAssignment(value: string) {
        window.location.href = `/teacher/attendances?assignment_id=${value}&attendance_date=${form.data.attendance_date}`;
    }

    function submit(event: FormEvent) { event.preventDefault(); form.post('/teacher/attendances'); }

    return <><Head title="Attendance" /><MainLayout><Stack spacing={2}><Typography variant="h4">Pencatatan Attendance</Typography><Paper sx={{ p: 3 }}><Stack component="form" spacing={2} onSubmit={submit}><Select size="small" displayEmpty value={form.data.teaching_assignment_id} onChange={(e) => { form.setData('teaching_assignment_id', e.target.value); selectAssignment(String(e.target.value)); }}><MenuItem value="">Pilih TeachingAssignment</MenuItem>{assignments.map((assignment) => <MenuItem key={assignment.id} value={assignment.id}>{assignment.subject.name} — {assignment.class_room.level} {assignment.class_room.name}</MenuItem>)}</Select><DatePicker label="Tanggal Attendance" format="YYYY-MM-DD" value={form.data.attendance_date ? dayjs(form.data.attendance_date) : dayjs()} onChange={(date) => form.setData('attendance_date', date?.format('YYYY-MM-DD') ?? '')} slotProps={{ textField: { size: 'small' } }} />{students.length > 0 && <Table><TableHead><TableRow><TableCell>NIS</TableCell><TableCell>Name</TableCell><TableCell>Status</TableCell></TableRow></TableHead><TableBody>{students.map((student) => <TableRow key={student.id}><TableCell>{student.nis}</TableCell><TableCell>{student.name}</TableCell><TableCell><Select size="small" value={form.data.attendances[student.id]} onChange={(e) => form.setData('attendances', { ...form.data.attendances, [student.id]: e.target.value })}><MenuItem value="present">Hadir</MenuItem><MenuItem value="excused">Izin</MenuItem><MenuItem value="sick">Sakit</MenuItem><MenuItem value="absent">Alpa</MenuItem></Select></TableCell></TableRow>)}</TableBody></Table>}{form.errors.attendances && <Typography color="error">{form.errors.attendances}</Typography>}<Box sx={{ width: '100px' }}><Button size="small" fullWidth type="submit" variant="contained" disabled={form.processing || students.length === 0}>Simpan</Button></Box></Stack></Paper></Stack></MainLayout></>;
}
