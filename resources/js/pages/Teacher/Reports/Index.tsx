import { Head, router } from "@inertiajs/react";
import {
    Alert,
    Box,
    Button,
    FormControl,
    FormLabel,
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
    TextField,
    Typography,
} from "@mui/material";
import {useState, type FormEvent } from "react";
import MainLayout from "@/layouts/MainLayout";

type Assignment = {
    id: number;
    subject: { name: string };
    class_room: { name: string; level: string };
};

type ReportRow = {
    student_id: number;
    nis: string;
    name: string;
    statuses: Record<string, string | null>;
    summary: {
        present: number;
        excused: number;
        sick: number;
        absent: number;
    };
};

type Props = {
    assignments: Assignment[];
    selectedAssignmentId?: number;
    month: number;
    year: number;
    dates: string[];
    rows: ReportRow[];
};

const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];
/**FREEZING COLUMNS */
// 1. Define explicit widths for your frozen columns
const FIRST_COL_WIDTH = 150;
const SECOND_COL_WIDTH = 200;

// 2. Create reusable styles for the sticky columns
const stickyFirstColumn = {
    position: "sticky",
    left: 0,
    width: FIRST_COL_WIDTH,
    minWidth: FIRST_COL_WIDTH,
    maxWidth: FIRST_COL_WIDTH,
    backgroundColor: "white",
};

const stickySecondColumn = {
    position: "sticky",
    left: FIRST_COL_WIDTH, // Shifts the 2nd column right by the exact width of the 1st column
    width: SECOND_COL_WIDTH,
    minWidth: SECOND_COL_WIDTH,
    maxWidth: SECOND_COL_WIDTH,
    backgroundColor: "white",
};

/**END FREEZING COLUMN */

export default function ReportIndex({
    assignments,
    selectedAssignmentId,
    month,
    year,
    dates,
    rows,
}: Props) {
    const [selectedMonth, setSelectedMonth] = useState(String(month));
    const [selectedYear, setSelectedYear] = useState(String(year));
    const [attendanceData, setAttendanceData] = useState(rows);
    const [selectedAssignment, setSelectedAssignment] = useState(
        selectedAssignmentId ? String(selectedAssignmentId) : "",
    );
    const assignmentInfo = assignments.find(
        (assignment) => assignment.id === selectedAssignmentId,
    );


    function submit(event: FormEvent) {
        event.preventDefault();

        router.get(
            "/teacher/reports",
            {
                month: selectedMonth,
                year: selectedYear,
                teaching_assignment_id: selectedAssignment,
            },
            { preserveState: false, preserveScroll: true, replace: true },
        );
    }

    return (
        <>
            <Head title="Attendance Report" />

            <MainLayout>
                <Stack spacing={4}>
                    <Typography variant="h4">Laporan Kehadiran</Typography>

                    <Paper
                        elevation={12}
                        sx={{ p: 3, marginBottom: "24px", borderRadius: 4 }}
                    >
                        <Stack
                            component="form"
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                            onSubmit={submit}
                        >
                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <FormLabel>Bulan</FormLabel>
                                <Select
                                    value={selectedMonth}
                                    onChange={(event) =>
                                        setSelectedMonth(event.target.value)
                                    }
                                >
                                    {monthNames.map((name, index) => (
                                        <MenuItem
                                            key={name}
                                            value={String(index + 1)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Tahun</FormLabel>
                                <TextField
                                    size="small"
                                    type="number"
                                    value={selectedYear}
                                    onChange={(event) =>
                                        setSelectedYear(event.target.value)
                                    }
                                    slotProps={{
                                        htmlInput: { min: 2000, max: 2100 },
                                    }}
                                />
                            </FormControl>
                            <FormControl size="small" sx={{ minWidth: 280 }}>
                                <FormLabel>Mapel dan Kelas</FormLabel>
                                <Select
                                    displayEmpty
                                    value={selectedAssignment}
                                    onChange={(event) =>
                                        setSelectedAssignment(
                                            event.target.value,
                                        )
                                    }
                                >
                                    <MenuItem value="">
                                        Pilih Mapel dan Kelas
                                    </MenuItem>
                                    {assignments.map((assignment) => (
                                        <MenuItem
                                            key={assignment.id}
                                            value={String(assignment.id)}
                                        >
                                            {assignment.subject.name} —{" "}
                                            {assignment.class_room.level}{" "}
                                            {assignment.class_room.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box sx={{ width: "100px", alignSelf: "end" }}>
                                <Button
                                    size="small"
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                >
                                    Lihat
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                    <Box>
                        <Stack
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 4,
                            }}
                        >
                            <Typography component={"h1"}>
                                Laporan Kehadiran
                            </Typography>
                            <Typography component={"label"}>
                                Bulan {monthNames[month - 1]} Tahun {year}
                            </Typography>
                            <Typography component={"h2"}>
                                {assignmentInfo?.class_room.name}{" "}
                            </Typography>
                            <Typography component={"h2"}>
                                {assignmentInfo?.subject.name}{" "}
                            </Typography>
                        </Stack>
                        {!selectedAssignmentId ? (
                            <Alert severity="info">
                                Pilih Mapel dan Kelas, bulan, dan tahun lalu
                                tekan Lihat.
                            </Alert>
                        ) : (
                            <TableContainer
                                component={Paper}
                                sx={{ overflowX: "auto" }}
                            >
                                <Table size="small" sx={{ minWidth: 900 }}>
                                    <TableHead>
                                        <TableRow>
                                            {/* Header: First Frozen Column (High zIndex to sit above scrolling body cells) */}
                                            <TableCell
                                                rowSpan={2}
                                                sx={{
                                                    ...stickyFirstColumn,
                                                    zIndex: 3,
                                                    backgroundColor: "#f5f5f5",
                                                }}
                                            >
                                                NIS
                                            </TableCell>
                                            {/* Header: Second Frozen Column */}
                                            <TableCell
                                                rowSpan={2}
                                                sx={{
                                                    ...stickySecondColumn,
                                                    zIndex: 3,
                                                    backgroundColor: "#f5f5f5",
                                                }}
                                            >
                                                Nama Siswa
                                            </TableCell>
                                            <TableCell colSpan={dates.length}>
                                                Tanggal
                                            </TableCell>
                                            <TableCell colSpan={4}>
                                                Summary
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            {/* Regular Headers (Lower zIndex) */}
                                            {dates.map((date) => (
                                                <TableCell
                                                    key={date}
                                                    sx={{
                                                        zIndex: 1,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {date.slice(-2)}
                                                </TableCell>
                                            ))}

                                            <TableCell
                                                sx={{
                                                    zIndex: 1,
                                                    textAlign: "center",
                                                }}
                                            >
                                                H
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    zIndex: 1,
                                                    textAlign: "center",
                                                }}
                                            >
                                                I
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    zIndex: 1,
                                                    textAlign: "center",
                                                }}
                                            >
                                                S
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    zIndex: 1,
                                                    textAlign: "center",
                                                }}
                                            >
                                                A
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {attendanceData.map((row) => (
                                            <TableRow key={row.student_id}>
                                                {/* Body: First Frozen Column (zIndex: 2 ensures it stays above standard columns) */}
                                                <TableCell
                                                    sx={{
                                                        ...stickyFirstColumn,
                                                        zIndex: 2,
                                                    }}
                                                >
                                                    {row.nis}
                                                </TableCell>
                                                {/* Body: Second Frozen Column */}
                                                <TableCell
                                                    sx={{
                                                        ...stickySecondColumn,
                                                        zIndex: 2,
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {row.name}
                                                </TableCell>
                                                {dates.map((date) => (
                                                    <TableCell
                                                        key={date}
                                                        align="center"
                                                    >
                                                        {row.statuses[date] ??
                                                            ""}
                                                    </TableCell>
                                                ))}
                                                <TableCell align="center">
                                                    {row.summary.present}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.summary.excused}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.summary.sick}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.summary.absent}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                </Stack>
            </MainLayout>
        </>
    );
}
