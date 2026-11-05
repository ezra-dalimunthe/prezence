import { Head, router } from "@inertiajs/react";
import {
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
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
    user?: { email: string } | null;
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
                    <Typography variant="h4">Teachers</Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: "flex-end" }}
                    >
                        <Stack direction="row" spacing={1} >
                            <Box sx={{display:"flex"}}>
                                <Button
                                    size="small"
                                    fullWidth
                                    onClick={() =>
                                        router.visit("/admin/teachers/create")
                                    }
                                    variant="contained"
                                >
                                    Tambah Teacher
                                </Button>
                            </Box>
                            <Box sx={{display:"flex"}}>
                                <Button
                                    size="small"
                                    fullWidth
                                    onClick={() =>
                                        router.visit("/admin/import/teachers")
                                    }
                                    variant="outlined"
                                >
                                    Import Teacher
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile Phone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teachers.data.map((teacher) => (
                                    <TableRow key={teacher.id}>
                                        <TableCell>{teacher.name}</TableCell>
                                        <TableCell>
                                            {teacher.mobile_phone}
                                        </TableCell>
                                        <TableCell>
                                            {teacher.user?.email ?? "-"}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex" }}>
                                                <Box sx={{ width: "100px" }}>
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
                                                </Box>
                                                {!teacher.user && (
                                                    <Box
                                                        sx={{ width: "200px" }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            fullWidth
                                                            onClick={() =>
                                                                setAccountFor(
                                                                    teacher.id,
                                                                )
                                                            }
                                                        >
                                                            Create account
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
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
