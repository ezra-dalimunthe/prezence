import { Head } from "@inertiajs/react";
import { Paper, Stack, Typography } from "@mui/material";
import MainLayout from "@/layouts/MainLayout";
import {
    DynamicDashboardProps,
    DynamicDashboard,
} from "@/layouts/DynamicDashboard";
export default function Dashboard({ type, payload }: DynamicDashboardProps) {
    return (
        <>
            <Head title={"Dashboard"} />

            <MainLayout>
                <DynamicDashboard type={type} payload={payload} />
            </MainLayout>
        </>
    );
}
