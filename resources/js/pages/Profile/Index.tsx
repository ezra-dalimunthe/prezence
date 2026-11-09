import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Alert,
    Box,
    Button,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useEffect, type FormEvent } from "react";
import MainLayout from "@/layouts/MainLayout";

type Profile = {
    id: number;
    type: "teacher" | "student" | "staff";
    name: string;
    mobile_phone?: string;
    nis?: string;
    gender?: string;
    birth_date?: string | null;
    birth_place?: string;
    position?: string;
    class_room?: { name: string; level: string } | null;
};

type Props = {
    account: {
        email: string;
        role: string;
        must_change_password: boolean;
    };
    profile: Profile;
};

type PageProps = Props & { flash?: { success?: string } };

export default function ProfileIndex({ account, profile }: Props) {
    const { flash } = usePage<PageProps>().props;
    const profileForm = useForm({
        name: profile.name,
        mobile_phone: profile.mobile_phone ?? "",
        gender: profile.gender ?? "",
        birth_date: profile.birth_date ?? "",
        birth_place: profile.birth_place ?? "",
        position: profile.position ?? "",
    });
    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        profileForm.setData({
            name: profile.name,
            mobile_phone: profile.mobile_phone ?? "",
            gender: profile.gender ?? "",
            birth_date: profile.birth_date ?? "",
            birth_place: profile.birth_place ?? "",
            position: profile.position ?? "",
        });
    }, [profile]);

    function updateProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        profileForm.put("/profile");
    }

    function updatePassword(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        passwordForm.put("/profile/password");
    }

    return (
        <>
            <Head title="Profile" />
            <MainLayout>
                <Stack spacing={3}>
                    <Typography variant="h4">Profile</Typography>
                    {flash?.success && (
                        <Alert severity="success">{flash.success}</Alert>
                    )}

                    <Paper sx={{ p: 3 }}>
                        <Stack
                            spacing={2}
                            component="form"
                            onSubmit={updateProfile}
                        >
                            <Typography variant="h6">
                                Profile Information
                            </Typography>

                            <TextField
                                label="Name"
                                value={profileForm.data.name}
                                onChange={(event) =>
                                    profileForm.setData(
                                        "name",
                                        event.target.value,
                                    )
                                }
                                error={Boolean(profileForm.errors.name)}
                                helperText={profileForm.errors.name}
                                size="small"
                            />

                            {profile.type === "teacher" && (
                                <TextField
                                    label="Mobile Phone"
                                    value={profileForm.data.mobile_phone}
                                    onChange={(event) =>
                                        profileForm.setData(
                                            "mobile_phone",
                                            event.target.value,
                                        )
                                    }
                                    error={Boolean(
                                        profileForm.errors.mobile_phone,
                                    )}
                                    helperText={profileForm.errors.mobile_phone}
                                    size="small"
                                />
                            )}

                            {profile.type === "student" && (
                                <>
                                    <TextField
                                        label="NIS"
                                        value={profile.nis ?? ""}
                                        size="small"
                                        disabled
                                    />
                                    <Select
                                        size="small"
                                        value={profileForm.data.gender}
                                        onChange={(event) =>
                                            profileForm.setData(
                                                "gender",
                                                event.target.value,
                                            )
                                        }
                                    >
                                        <MenuItem value="">
                                            Pilih Gender
                                        </MenuItem>
                                        <MenuItem value="male">
                                            Laki-laki
                                        </MenuItem>
                                        <MenuItem value="female">
                                            Perempuan
                                        </MenuItem>
                                    </Select>
                                    <DatePicker
                                        label="Birth Date"
                                        format="YYYY-MM-DD"
                                        value={
                                            profileForm.data.birth_date
                                                ? dayjs(
                                                      profileForm.data
                                                          .birth_date,
                                                  )
                                                : null
                                        }
                                        onChange={(date) =>
                                            profileForm.setData(
                                                "birth_date",
                                                date?.format("YYYY-MM-DD") ??
                                                    "",
                                            )
                                        }
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                error: Boolean(
                                                    profileForm.errors
                                                        .birth_date,
                                                ),
                                                helperText:
                                                    profileForm.errors
                                                        .birth_date,
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Birth Place"
                                        value={profileForm.data.birth_place}
                                        onChange={(event) =>
                                            profileForm.setData(
                                                "birth_place",
                                                event.target.value,
                                            )
                                        }
                                        error={Boolean(
                                            profileForm.errors.birth_place,
                                        )}
                                        helperText={
                                            profileForm.errors.birth_place
                                        }
                                        size="small"
                                    />
                                    <TextField
                                        label="ClassRoom"
                                        value={
                                            profile.class_room
                                                ? `${profile.class_room.level} ${profile.class_room.name}`
                                                : "-"
                                        }
                                        size="small"
                                        disabled
                                    />
                                </>
                            )}

                            {profile.type === "staff" && (
                                <TextField
                                    label="Position"
                                    value={profileForm.data.position}
                                    onChange={(event) =>
                                        profileForm.setData(
                                            "position",
                                            event.target.value,
                                        )
                                    }
                                    error={Boolean(profileForm.errors.position)}
                                    helperText={profileForm.errors.position}
                                    size="small"
                                />
                            )}

                            <Box sx={{ width: "120px" }}>
                                <Button
                                    size="small"
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={profileForm.processing}
                                >
                                    Simpan Profile
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                    <Paper sx={{ p: 3 }}>
                         <Typography variant="h6">
                                Account Information
                            </Typography>
                        <Typography>Email: {account.email}</Typography>
                        <Typography>Role: {account.role}</Typography>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Stack
                            spacing={2}
                            component="form"
                            onSubmit={updatePassword}
                        >
                            <Typography variant="h6">
                                Change Password
                            </Typography>
                            {account.must_change_password && (
                                <Alert severity="warning">
                                    Silakan ubah temporary password Anda.
                                </Alert>
                            )}
                            {Object.entries(passwordForm.errors).map(
                                ([field, message]) => (
                                    <Alert key={field} severity="error">
                                        {message}
                                    </Alert>
                                ),
                            )}
                            <TextField
                                label="Current Password"
                                type="password"
                                size="small"
                                value={passwordForm.data.current_password}
                                onChange={(event) =>
                                    passwordForm.setData(
                                        "current_password",
                                        event.target.value,
                                    )
                                }
                            />
                            <TextField
                                label="New Password"
                                type="password"
                                size="small"
                                value={passwordForm.data.password}
                                onChange={(event) =>
                                    passwordForm.setData(
                                        "password",
                                        event.target.value,
                                    )
                                }
                            />
                            <TextField
                                label="Confirm New Password"
                                type="password"
                                size="small"
                                value={passwordForm.data.password_confirmation}
                                onChange={(event) =>
                                    passwordForm.setData(
                                        "password_confirmation",
                                        event.target.value,
                                    )
                                }
                            />
                            <Box sx={{ width: "120px" }}>
                                <Button
                                    size="small"
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={passwordForm.processing}
                                >
                                    Ubah Password
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                </Stack>
            </MainLayout>
        </>
    );
}
