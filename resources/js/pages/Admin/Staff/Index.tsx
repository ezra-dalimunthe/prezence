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

type Staff = {
    id: number;
    name: string;
    position: string;
    user?: { id: number; email: string; role: string } | null;
};
type Pagination<T> = {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
};

export default function StaffIndex({
    staff,
    createAccountFor = null,
}: {
    staff: Pagination<Staff>;
    createAccountFor?: number | null;
}) {
    const [accountFor, setAccountFor] = useState<number | null>(
        createAccountFor,
    );
    function changePage(page: number) {
        router.get(
            "/admin/staff",
            { page: page + 1 },
            { preserveState: true, preserveScroll: true },
        );
    }
    return (
        <>
            <Head title="Staff" />
            <MainLayout>
                <Stack spacing={2}>
                    <Typography variant="h4">Staff</Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: "flex-end" }}
                    >
                        <Box sx={{ width: "100px" }}>
                            <Button
                                size="small"
                                fullWidth
                                onClick={() =>
                                    router.visit("/admin/staff/create")
                                }
                                variant="contained"
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
                                        <TableCell>Name</TableCell>
                                        <TableCell>Position</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {staff.data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                {item.position}
                                            </TableCell>
                                            <TableCell>
                                                {item.user?.role ?? "-"}
                                            </TableCell>
                                            <TableCell>
                                                {item.user?.email ?? "-"}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ width: "100px" }}>
                                                    <Button
                                                        size="small"
                                                        fullWidth
                                                        onClick={() =>
                                                            router.visit(
                                                                `/admin/staff/${item.id}/edit`,
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                </Box>
                                                {!item.user && (
                                                    <Box
                                                        sx={{ width: "100px" }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            fullWidth
                                                            onClick={() =>
                                                                setAccountFor(
                                                                    item.id,
                                                                )
                                                            }
                                                        >
                                                            Create account
                                                        </Button>
                                                    </Box>
                                                )}
                                                {item.user && (
                                                    <Box
                                                        sx={{ width: "140px" }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            fullWidth
                                                            onClick={() =>
                                                                router.visit(
                                                                    `/admin/accounts/${item.user?.id}/edit`,
                                                                )
                                                            }
                                                        >
                                                            Edit Account
                                                        </Button>
                                                    </Box>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={staff.total}
                                page={staff.current_page - 1}
                                rowsPerPage={staff.per_page}
                                rowsPerPageOptions={[staff.per_page]}
                                onPageChange={(_, page) => changePage(page)}
                                labelRowsPerPage="Data per halaman"
                            />
                        </TableContainer>
                    </Paper>
                </Stack>
            </MainLayout>
            <CreateAccountModal
                staffId={accountFor}
                onClose={() => setAccountFor(null)}
            />
        </>
    );
}
