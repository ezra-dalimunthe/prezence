import AdminDashboard from "@/pages/Admin/Dashboard";
import TeacherDashboard from "@/pages/Teacher/Dashboard";

export const DashboardType: Record<string, React.ComponentType<any>> = {
    admin: AdminDashboard,
    teacher: TeacherDashboard,
};
export interface DynamicDashboardProps {
    type: string;
    payload: any;
}

export const DynamicDashboard = ({
    
    type,
    payload: payload,
}: DynamicDashboardProps) => {
    const SelectedDashboard = DashboardType[type];
    if (!SelectedDashboard) {
        return;
    }
    return <SelectedDashboard payload={payload} />;
};
