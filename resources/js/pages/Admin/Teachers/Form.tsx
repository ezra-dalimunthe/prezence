import { Box, Button, Stack, TextField } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
    form: any;
    onSubmit: (event: FormEvent) => void;
    mode: "create" | "edit";
};

export default function TeacherForm({ form, onSubmit, mode }: Props) {
    return (
        <Stack component="form" spacing={2} onSubmit={onSubmit}>
            <TextField
                size="small"
                label="Name"
                value={form.data.name}
                onChange={(event) => form.setData("name", event.target.value)}
                error={Boolean(form.errors.name)}
                helperText={form.errors.name}
            />
            <TextField
                size="small"
                label="Mobile Phone"
                value={form.data.mobile_phone}
                onChange={(event) =>
                    form.setData("mobile_phone", event.target.value)
                }
                error={Boolean(form.errors.mobile_phone)}
                helperText={form.errors.mobile_phone}
            />
            <Box sx={{display:"flex", justifyContent:"flex-end"}}>
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
