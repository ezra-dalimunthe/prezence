import { Box, Button, Stack, TextField } from "@mui/material";
import type { FormEvent } from "react";

export default function StaffForm({
    form,
    onSubmit,
    mode,
}: {
    form: any;
    onSubmit: (event: FormEvent) => void;
    mode: "create" | "edit";
}) {
    return (
        <Stack component="form" spacing={2} onSubmit={onSubmit}>
            <TextField
                size="small"
                label="Name"
                value={form.data.name}
                onChange={(e) => form.setData("name", e.target.value)}
                error={Boolean(form.errors.name)}
                helperText={form.errors.name}
            />
            <TextField
                size="small"
                label="Position"
                value={form.data.position}
                onChange={(e) => form.setData("position", e.target.value)}
                error={Boolean(form.errors.position)}
                helperText={form.errors.position}
            />
            <Box sx={{ width: "100px" }}>
                <Button
                    size="small"
                    type="submit"
                    variant="contained"
                    disabled={form.processing}
                >
                    {mode === "create" ? "Simpan" : "Update"}
                </Button>
            </Box>
        </Stack>
    );
}
