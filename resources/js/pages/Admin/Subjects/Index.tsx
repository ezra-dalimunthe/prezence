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
import MainLayout from "@/layouts/MainLayout";
type Subject = { id: number; name: string };
type Pagination<T> = {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
};
export default function SubjectIndex({
    subjects,
}: {
    subjects: Pagination<Subject>;
}) {
    function changePage(page: number) {
        router.get(
            "/admin/subjects",
            { page: page + 1 },
            { preserveState: true, preserveScroll: true },
        );
    }
    function destroy(id: number) {
        if (window.confirm("Hapus Subject ini?"))
            router.delete(`/admin/subjects/${id}`);
    }
    return (
        <>
            <Head title="Subjects" />
            <MainLayout>
                <Stack spacing={2}>
                    <Typography variant="h4">Mapel</Typography>
                    <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
                        <Box>
                            <Button
                                size="small"
                                fullWidth
                                variant="contained"
                                onClick={() =>
                                    router.visit("/admin/subjects/create")
                                }
                            >
                                Tambah
                            </Button>
                        </Box>
                    </Stack>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: "auto" }}>
                                            Name
                                        </TableCell>
                                        <TableCell colSpan={2} sx={{width:"200px"}}>
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subjects.data.map((subject) => (
                                        <TableRow key={subject.id}>
                                            <TableCell>
                                                {subject.name}
                                            </TableCell>
                                            <TableCell sx={{ width: "50px" }}>
                                                <Button
                                                    size="small"
                                                    fullWidth
                                                    onClick={() =>
                                                        router.visit(
                                                            `/admin/subjects/${subject.id}/edit`,
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell >
                                                <Button
                                                    size="small"
                                                    fullWidth
                                                    color="error"
                                                    onClick={() =>
                                                        destroy(subject.id)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={subjects.total}
                                page={subjects.current_page - 1}
                                rowsPerPage={subjects.per_page}
                                rowsPerPageOptions={[subjects.per_page]}
                                onPageChange={(_, page) => changePage(page)}
                                labelRowsPerPage="Data per halaman"
                            />
                        </TableContainer>
                    </Paper>
                </Stack>
            </MainLayout>
        </>
    );
}
