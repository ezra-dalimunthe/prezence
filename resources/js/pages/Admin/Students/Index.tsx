import { Head, router } from "@inertiajs/react";
import {
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import CreateAccountModal from "./CreateAccountModal";

type Student = {
    id: number;
    name: string;
    nis: string;
    class_room?: { name: string } | null;
    user?: { id: number; email: string } | null;
};
type Pagination<T> = {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
};

export default function StudentIndex({
    students,
    createAccountFor = null,
}: {
    students: Pagination<Student>;
    createAccountFor?: number | null;
}) {
    const [accountFor, setAccountFor] = useState<number | null>(
        createAccountFor,
    );
    function changePage(page: number) {
        router.get(
            "/admin/students",
            { page: page + 1 },
            { preserveState: true, preserveScroll: true },
        );
    }
    return (
        <>
            <Head title="Students" />
            <MainLayout>
                <Stack spacing={2}>
                    <Typography variant="h4">Siswa</Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: "flex-end" }}
                    >
                        <Stack direction="row" spacing={1}>
                            <Box sx={{ width: "100px" }}>
                                <Button
                                    size="small"
                                    fullWidth
                                    onClick={() =>
                                        router.visit("/admin/students/create")
                                    }
                                    variant="contained"
                                >
                                    Tambah
                                </Button>
                            </Box>
                            <Box sx={{ width: "100px" }}>
                                <Button
                                    size="small"
                                    fullWidth
                                    onClick={() =>
                                        router.visit("/admin/import/students")
                                    }
                                    variant="outlined"
                                >
                                    Import
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: "auto" }}>
                                            Name
                                        </TableCell>
                                        <TableCell>NIS</TableCell>
                                        <TableCell>ClassRoom</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell
                                            colSpan={2}
                                            
                                        >
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.data.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                {student.name}
                                            </TableCell>
                                            <TableCell>{student.nis}</TableCell>
                                            <TableCell>
                                                {student.class_room?.name ??
                                                    "-"}
                                            </TableCell>
                                            <TableCell>
                                                {student.user?.email ?? "-"}
                                            </TableCell>
                                            <TableCell sx={{width:"50px"}}>
                                                <Button
                                                    size="small"
                                                    fullWidth
                                                    onClick={() =>
                                                        router.visit(
                                                            `/admin/students/${student.id}/edit`,
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell sx={{width:"180px"}}>
                                                {!student.user && (
                                                    <Button
                                                        size="small"
                                                        fullWidth
                                                        onClick={() =>
                                                            setAccountFor(
                                                                student.id,
                                                            )
                                                        }
                                                    >
                                                        Create account
                                                    </Button>
                                                )}
                                                {student.user && (
                                                    <Button
                                                        size="small"
                                                        fullWidth
                                                        onClick={() =>
                                                            router.visit(
                                                                `/admin/accounts/${student.user?.id}/edit`,
                                                            )
                                                        }
                                                    >
                                                        Edit Account
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={students.total}
                                page={students.current_page - 1}
                                rowsPerPage={students.per_page}
                                rowsPerPageOptions={[students.per_page]}
                                onPageChange={(_, page) => changePage(page)}
                                labelRowsPerPage="Data per halaman"
                            />
                        </TableContainer>
                    </Paper>
                </Stack>
            </MainLayout>
            <CreateAccountModal
                studentId={accountFor}
                onClose={() => setAccountFor(null)}
            />
        </>
    );
}
