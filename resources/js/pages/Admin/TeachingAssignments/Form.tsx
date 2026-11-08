import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";
import type { FormEvent } from "react";

type Option = { id: number; name: string; level?: string };
type Props = {
    form: any;
    teachers: Option[];
    subjects: Option[];
    classRooms: Option[];
    onSubmit: (event: FormEvent) => void;
    mode: "create" | "edit";
};

export default function TeachingAssignmentForm({
    form,
    teachers,
    subjects,
    classRooms,
    onSubmit,
    mode,
}: Props) {
    return (
        <Stack component="form" spacing={2} onSubmit={onSubmit}>
            <FormControl size="small" error={Boolean(form.errors.teacher_id)}>
                <Select
                    displayEmpty
                    value={form.data.teacher_id}
                    onChange={(e) => form.setData("teacher_id", e.target.value)}
                >
                    {[
                        <MenuItem key="" value="">
                            Pilih Teacher
                        </MenuItem>,
                        ...teachers.map((teacher) => (
                            <MenuItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </MenuItem>
                        )),
                    ]}
                </Select>
                <FormHelperText>{form.errors.teacher_id}</FormHelperText>
            </FormControl>
            <FormControl size="small" error={Boolean(form.errors.subject_id)}>
                <Select
                    displayEmpty
                    value={form.data.subject_id}
                    onChange={(e) => form.setData("subject_id", e.target.value)}
                >
                    {[
                        <MenuItem key="" value="">
                            Pilih Subject
                        </MenuItem>,
                        ...subjects.map((subject) => (
                            <MenuItem key={subject.id} value={subject.id}>
                                {subject.name}
                            </MenuItem>
                        )),
                    ]}
                </Select>
                <FormHelperText>{form.errors.subject_id}</FormHelperText>
            </FormControl>
            <FormControl size="small" error={Boolean(form.errors.class_id)}>
                <Select
                    displayEmpty
                    value={form.data.class_id}
                    onChange={(e) => form.setData("class_id", e.target.value)}
                >
                    {[
                        <MenuItem key="" value="">
                            Pilih ClassRoom
                        </MenuItem>,
                        ...classRooms.map((classRoom) => (
                            <MenuItem key={classRoom.id} value={classRoom.id}>
                                {classRoom.level} - {classRoom.name}
                            </MenuItem>
                        )),
                    ]}
                </Select>
                <FormHelperText>{form.errors.class_id}</FormHelperText>
            </FormControl>
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
