<?php
namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->user()?->role ?? 'guest';

        return Inertia::render('Dashboard', [
            'type' => $type,
            'payload' => match ($type) {
                "admin" =>
                [
                    'numberOfStudents' => Student::count(),
                    'numberOfTeachers' => Teacher::count(),
                    'numberOfStaffs' => Staff::count()
                ]
                ,
                default => []
            }

        ]);
    }
}
