import { Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { FormEvent } from "react";

type Props = {
    form: any;
    classRooms: { id: number; name: string; level: string }[];
    onSubmit: (event: FormEvent) => void;
    mode: "create" | "edit";
};

export default function StudentForm({
    form,
    classRooms,
    onSubmit,
    mode,
}: Props) {
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
                label="NIS"
                value={form.data.nis}
                onChange={(e) => form.setData("nis", e.target.value)}
                error={Boolean(form.errors.nis)}
                helperText={form.errors.nis}
            />
            <Select
                size="small"
                displayEmpty
                value={form.data.gender}
                onChange={(e) => form.setData("gender", e.target.value)}
            >
                {["", "male", "female"].map((gender) => (
                    <MenuItem key={gender} value={gender}>
                        {gender || "Pilih Gender"}
                    </MenuItem>
                ))}
            </Select>
            <DatePicker
                label="Birth Date"
                format="YYYY-MM-DD"
                maxDate={dayjs()}
                value={form.data.birth_date ? dayjs(form.data.birth_date) : null}
                onChange={(date) => form.setData("birth_date", date?.format("YYYY-MM-DD") ?? "")}
                slotProps={{
                    textField: {
                        size: "small",
                        error: Boolean(form.errors.birth_date),
                        helperText: form.errors.birth_date,
                    },
                }}
            />
            <TextField
                size="small"
                label="Birth Place"
                value={form.data.birth_place}
                onChange={(e) => form.setData("birth_place", e.target.value)}
                error={Boolean(form.errors.birth_place)}
                helperText={form.errors.birth_place}
            />
            <Select
                size="small"
                displayEmpty
                value={form.data.class_id}
                onChange={(e) => form.setData("class_id", e.target.value)}
            >
                <MenuItem value="">Pilih ClassRoom</MenuItem>
                {classRooms.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                        {room.level} - {room.name}
                    </MenuItem>
                ))}
            </Select>
            <Box sx={{ width: "100px" }}>
                <Button
                    size="small"
                    fullWidth
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
