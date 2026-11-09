import { Head, router, useForm, usePage } from "@inertiajs/react";
import {
    Button,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Box,
    FormControl,
    FormLabel,
    Alert,
    TableContainer,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState, type FormEvent } from "react";
import MainLayout from "@/layouts/MainLayout";

type Assignment = {
    id: number;
    subject: { name: string };
    class_room: { name: string; level: string };
};
type Student = { id: number; name: string; nis: string };

type Props = {
    assignments: Assignment[];
    selectedAssignmentId?: number;
    students: Student[];
    attendanceDate: string;
    attendances: Record<string, string>;
};
type PageProps = Props & {
    flash?: { success?: string };
};

export default function AttendanceIndex({
    assignments,
    selectedAssignmentId,
    students,
    attendanceDate,
    attendances,
}: Props) {
    const { flash } = usePage<PageProps>().props;
    const [successMessage, setSuccessMessage] = useState(flash?.success);
    const form = useForm<Record<string, any>>({
        teaching_assignment_id: selectedAssignmentId
            ? String(selectedAssignmentId)
            : "",
        attendance_date: attendanceDate || dayjs().format("YYYY-MM-DD"),
        attendances: attendances,
    });

    useEffect(() => {
        setSuccessMessage(flash?.success);
    }, [flash?.success]);

    useEffect(() => {
        form.clearErrors();
        form.setData({
            teaching_assignment_id: selectedAssignmentId
                ? String(selectedAssignmentId)
                : "",
            attendance_date: attendanceDate || dayjs().format("YYYY-MM-DD"),
            attendances: attendances,
        });
    }, [selectedAssignmentId, attendanceDate, attendances]);

    function selectAssignment(value: string) {
        setSuccessMessage(undefined);
        form.clearErrors();
        router.get(
            "/teacher/attendances",
            {
                assignment_id: value,
                attendance_date: form.data.attendance_date,
            },
            {
                only: [
                    "assignments",
                    "selectedAssignmentId",
                    "students",
                    "attendanceDate",
                    "attendances",
                    "flash",
                ],
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }
    function selectDate(value: string) {
        setSuccessMessage(undefined);
        form.clearErrors();
        router.get(
            "/teacher/attendances",
            {
                assignment_id: form.data.teaching_assignment_id,
                attendance_date: value,
            },
            {
                only: [
                    "assignments",
                    "selectedAssignmentId",
                    "students",
                    "attendanceDate",
                    "attendances",
                    "flash",
                ],
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }
    function submit(event: FormEvent) {
        event.preventDefault();
        form.post("/teacher/attendances");
    }

    return (
        <>
            <Head title="Attendance" />

            <MainLayout>
                <Stack spacing={2}>
                    <Typography variant="h4">Pencatatan Kehadiran</Typography>
                    {successMessage && (
                        <Alert severity="success">{successMessage}</Alert>
                    )}
                    {Object.entries(form.errors).map(([field, message]) => (
                        <Alert key={field} severity="error">
                            {message}
                        </Alert>
                    ))}
                    <Paper sx={{ p: 3 }}>
                        <Stack component="form" spacing={2} onSubmit={submit}>
                            <Box sx={{ display: "flex", columnGap: 4 }}>
                                <FormControl>
                                    <FormLabel>Kelas</FormLabel>
                                    <Select
                                        size="small"
                                        displayEmpty
                                        value={form.data.teaching_assignment_id}
                                        onChange={(e) => {
                                            form.setData(
                                                "teaching_assignment_id",
                                                e.target.value,
                                            );
                                            selectAssignment(
                                                String(e.target.value),
                                            );
                                        }}
                                    >
                                        <MenuItem value="">
                                            Pilih TeachingAssignment
                                        </MenuItem>
                                        {assignments.map((assignment) => (
                                            <MenuItem
                                                key={assignment.id}
                                                value={assignment.id}
                                            >
                                                {assignment.subject.name} —{" "}
                                                {assignment.class_room.level}{" "}
                                                {assignment.class_room.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Tanggal</FormLabel>
                                    <DatePicker
                                        format="YYYY-MM-DD"
                                        value={
                                            form.data.attendance_date
                                                ? dayjs(
                                                      form.data.attendance_date,
                                                  )
                                                : dayjs()
                                        }
                                        onChange={(date) => {
                                            const value =
                                                date?.format("YYYY-MM-DD") ??
                                                "";

                                            form.setData(
                                                "attendance_date",
                                                value,
                                            );
                                            selectDate(value);
                                        }}
                                        slotProps={{
                                            textField: { size: "small" },
                                        }}
                                    />
                                </FormControl>
                            </Box>

                            {students.length > 0 && (
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>NIS</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {students.map((student) => (
                                                <TableRow key={student.id}>
                                                    <TableCell>
                                                        {student.nis}
                                                    </TableCell>
                                                    <TableCell>
                                                        {student.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Select
                                                            size="small"
                                                            value={
                                                                form.data
                                                                    .attendances[
                                                                    student.id
                                                                ] ?? "present"
                                                            }
                                                            onChange={(e) =>
                                                                form.setData(
                                                                    "attendances",
                                                                    {
                                                                        ...form
                                                                            .data
                                                                            .attendances,
                                                                        [student.id]:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            <MenuItem value="present">
                                                                Hadir
                                                            </MenuItem>
                                                            <MenuItem value="excused">
                                                                Izin
                                                            </MenuItem>
                                                            <MenuItem value="sick">
                                                                Sakit
                                                            </MenuItem>
                                                            <MenuItem value="absent">
                                                                Alpa
                                                            </MenuItem>
                                                        </Select>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                            <Box sx={{ width: "100px" }}>
                                <Button
                                    size="small"
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={
                                        form.processing || students.length === 0
                                    }
                                >
                                    Simpan
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                </Stack>
            </MainLayout>
        </>
    );
}
