import { router } from "@inertiajs/react";
import {
    Box,
    Button,
    Chip,
    type ChipProps,
    Paper,
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
import dayjs from "dayjs";
import { Fragment, useState, type FormEvent } from "react";

type Attendance = {
    id: number;
    status: string;
    student_id: number;
    teaching_assignment: {
        subject: { name: string };
        teacher: { name: string };
    };
};
type Payload = {
    student: {
        id: number;
        name: string;
        nis: string;
        class_room: { name: string; level: string } | null;
    };
    month: number;
    year: number;
    attendanceHistory: Record<string, Attendance[]>;
};
const showChip = (status: string) => {
    let nextStatus = "Hadir";
    let color: ChipProps["color"] = "success";
    switch (status) {
        case "excused":
            nextStatus = "Izin";
            color = "info";
            break;
        case "sick":
            nextStatus = "Sakit";
            color = "warning";
            break;
        case "absent":
            nextStatus = "Alpa";
            color = "error";
            break;
    }
    return <Chip color={color} label={nextStatus} />;
};
export default function StudentDashboard({ payload }: { payload: Payload }) {
    const [month, setMonth] = useState(String(payload.month));
    const [year, setYear] = useState(String(payload.year));

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        router.get(
            "/",
            { month, year },
            { preserveState: false, preserveScroll: true, replace: true },
        );
    }

    return (
        <Stack spacing={2}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4">Dashboard</Typography>
                <Typography sx={{ mt: 1 }}>
                    Name: {payload.student.name}
                </Typography>
                <Typography>NIS: {payload.student.nis}</Typography>
                <Typography>
                    Kelas :{" "}
                    {payload.student.class_room
                        ? `${payload.student.class_room.level} / ${payload.student.class_room.name}`
                        : "-"}
                </Typography>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 4 }}>
                    Riwayat Kehadiran
                </Typography>
                <Stack
                    component="form"
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    onSubmit={submit}
                >
                    <TextField
                        size="small"
                        label="Bulan"
                        type="number"
                        value={month}
                        onChange={(event) => setMonth(event.target.value)}
                        slotProps={{ htmlInput: { min: 1, max: 12 } }}
                    />
                    <TextField
                        size="small"
                        label="Tahun"
                        type="number"
                        value={year}
                        onChange={(event) => setYear(event.target.value)}
                        slotProps={{ htmlInput: { min: 2000, max: 2100 } }}
                    />
                    <Box sx={{ width: "100px", alignSelf: "center" }}>
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
            <Paper sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Bulan {payload.month} Tahun {payload.year}
                </Typography>
                <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tanggal</TableCell>
                            <TableCell>Mapel</TableCell>
                            <TableCell>Pengajar</TableCell>
                            <TableCell>Kehadiran</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(payload.attendanceHistory).map(
                            ([key, attendances]) => {
                                const [first, ...rest] = attendances;
                                return (
                                    <Fragment key={key}>
                                        <TableRow key={first.id}>
                                            <TableCell
                                                rowSpan={attendances.length}
                                                sx={{ verticalAlign: "top" }}
                                            >
                                                {key}
                                            </TableCell>
                                            <TableCell>
                                                1.
                                                {
                                                    first.teaching_assignment
                                                        .subject.name
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    first.teaching_assignment
                                                        .teacher.name
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {showChip(first.status)}
                                            </TableCell>
                                        </TableRow>
                                        {rest.map((item, idx) => {
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        {idx + 2}.
                                                        {
                                                            item
                                                                .teaching_assignment
                                                                .subject.name
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            item
                                                                .teaching_assignment
                                                                .teacher.name
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {showChip(item.status)}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </Fragment>
                                );
                            },
                        )}
                    </TableBody>
                </Table>
                </TableContainer>
            </Paper>
        </Stack>
    );
}
