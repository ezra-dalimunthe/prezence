import { router } from "@inertiajs/react";
import {
    Box,
    Button,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

type Assignment = {
    id: number;
    subject: { name: string };
    class_room: { name: string; level: string };
};

type ClassSummary = {
    id: number;
    name: string;
    level: string;
    male_count: number;
    female_count: number;
};

type AttendanceSummary = {
    attendance_date: string;
    present_count: number | null;
    excused_count: number | null;
    sick_count: number | null;
    absent_count: number | null;
};

type Payload = {
    assignments: Assignment[];
    selectedAssignmentId?: number;
    classSummaries: ClassSummary[];
    attendanceSummary: AttendanceSummary[];
    weekLabel: string;
};

export default function TeacherDashboard({ payload }: { payload: Payload }) {
    const selectedAssignmentId = payload.selectedAssignmentId ?? "";

    function changeAssignment(value: string) {
        router.visit(value ? `/?assignment_id=${value}` : "/");
    }

    return (
        <Stack spacing={2}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4">Dashboard</Typography>

                <Box
                    sx={{
                        mt: 1,
                        display: "flex",
                        direction: "row",
                        columnGap: 2,
                    }}
                >
                    {payload.assignments.map((assignment) => (
                        <Button
                            key={assignment.id}
                            sx={{
                                width: "300px",
                                height: "150px",
                                textWrap: "auto",
                                wordWrap: "auto",
                            }}
                            onClick={() =>
                                router.visit(
                                    `/teacher/attendances?assignment_id=${assignment.id}`,
                                )
                            }
                            variant="contained"
                        >
                            Buka pencatatan {assignment.subject.name} <br />
                            {assignment.class_room.level}{" "}
                            {assignment.class_room.name}
                        </Button>
                    ))}
                </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Ringkasan Kelas
                </Typography>
                {payload.classSummaries.length === 0 ? (
                    <Typography>Tidak ada data kelas.</Typography>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Kelas</TableCell>
                                    <TableCell>
                                        Jumlah murid laki-laki
                                    </TableCell>
                                    <TableCell>
                                        Jumlah murid perempuan
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payload.classSummaries.map((classRoom) => (
                                    <TableRow key={classRoom.id}>
                                        <TableCell>
                                            {classRoom.level} {classRoom.name}
                                        </TableCell>
                                        <TableCell>
                                            {classRoom.male_count}
                                        </TableCell>
                                        <TableCell>
                                            {classRoom.female_count}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Ringkasan Attendance Minggu Berjalan
                </Typography>
                <Typography variant="subtitle1">{payload.weekLabel}</Typography>
                <Select
                    size="small"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                    displayEmpty
                    value={selectedAssignmentId}
                    onChange={(event) =>
                        changeAssignment(String(event.target.value))
                    }
                >
                    <MenuItem value="">Pilih TeachingAssignment</MenuItem>
                    {payload.assignments.map((assignment) => (
                        <MenuItem key={assignment.id} value={assignment.id}>
                            {assignment.subject.name} —{" "}
                            {assignment.class_room.level}{" "}
                            {assignment.class_room.name}
                        </MenuItem>
                    ))}
                </Select>
                {!selectedAssignmentId ? (
                    <Typography>
                        Pilih TeachingAssignment untuk melihat ringkasan
                        Attendance.
                    </Typography>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tanggal</TableCell>
                                <TableCell>Hadir</TableCell>
                                <TableCell>Izin</TableCell>
                                <TableCell>Sakit</TableCell>
                                <TableCell>Alpa</TableCell>
                                <TableCell>Detail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payload.attendanceSummary.map((row) => (
                                <TableRow key={row.attendance_date}>
                                    <TableCell>
                                        {dayjs(row.attendance_date)
                                            .locale("id")
                                            .format("DD MMM YYYY")}
                                    </TableCell>
                                    <TableCell>{row.present_count}</TableCell>
                                    <TableCell>{row.excused_count}</TableCell>
                                    <TableCell>{row.sick_count}</TableCell>
                                    <TableCell>{row.absent_count}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                router.visit(
                                                    `/teacher/attendances?assignment_id=${selectedAssignmentId}&attendance_date=${row.attendance_date}`,
                                                )
                                            }
                                        >
                                            Detail
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Paper>
        </Stack>
    );
}
