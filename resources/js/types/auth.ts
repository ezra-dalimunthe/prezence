export type User = {
    id: number;
    email: string;
    role: 'admin' | 'teacher' | 'student' | 'report_viewer';
    is_active: boolean;
    must_change_password: boolean;
    profile_type: string;
    profile_id: number;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
};

export type Auth = {
    user: User | null;
};
