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

type Teacher = {
    id: number;
    name: string;
    mobile_phone: string;
    user?: { id: number; email: string } | null;
};
type Pagination<T> = {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
};

export default function TeacherIndex({
    teachers,
    createAccountFor = null,
}: {
    teachers: Pagination<Teacher>;
    createAccountFor?: number | null;
}) {
    const [accountFor, setAccountFor] = useState<number | null>(
        createAccountFor,
    );
    function changePage(page: number) {
        router.get(
            "/admin/teachers",
            { page: page + 1 },
            { preserveState: true, preserveScroll: true },
        );
    }
    return (
        <>
            <Head title="Teachers" />
            <MainLayout>
                <Stack spacing={2}>
                    <Typography variant="h4">Guru</Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: "flex-end" }}
                    >
                        <Stack direction="row" spacing={1}>
                            <Box sx={{ display: "flex" }}>
                                <Button
                                    size="small"
                                    fullWidth
                                    onClick={() =>
                                        router.visit("/admin/teachers/create")
                                    }
                                    variant="contained"
                                >
                                    Tambah
                                </Button>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Button
                                    size="small"
                                    fullWidth
                                    onClick={() =>
                                        router.visit("/admin/import/teachers")
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
                                        <TableCell>Mobile Phone</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell
                                            colSpan={2}
                                            sx={{ width: "350px" }}
                                        >
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teachers.data.map((teacher) => (
                                        <TableRow key={teacher.id}>
                                            <TableCell>
                                                {teacher.name}
                                            </TableCell>
                                            <TableCell>
                                                {teacher.mobile_phone}
                                            </TableCell>
                                            <TableCell>
                                                {teacher.user?.email ?? "-"}
                                            </TableCell>
                                            <TableCell sx={{ width: "50px" }}>
                                                <Button
                                                    size="small"
                                                    fullWidth
                                                    onClick={() =>
                                                        router.visit(
                                                            `/admin/teachers/${teacher.id}/edit`,
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell sx={{width:"250px"}}>
                                                {!teacher.user && (
                                                    <Button
                                                        size="small"
                                                        onClick={() =>
                                                            setAccountFor(
                                                                teacher.id,
                                                            )
                                                        }
                                                    >
                                                        Create account
                                                    </Button>
                                                )}
                                                {teacher.user && (
                                                    <Button
                                                        size="small"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/admin/accounts/${teacher.user?.id}/edit`,
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
                                count={teachers.total}
                                page={teachers.current_page - 1}
                                rowsPerPage={teachers.per_page}
                                rowsPerPageOptions={[teachers.per_page]}
                                onPageChange={(_, page) => changePage(page)}
                                labelRowsPerPage="Data per halaman"
                            />
                        </TableContainer>
                    </Paper>
                </Stack>
            </MainLayout>
            <CreateAccountModal
                teacherId={accountFor}
                onClose={() => setAccountFor(null)}
            />
        </>
    );
}
