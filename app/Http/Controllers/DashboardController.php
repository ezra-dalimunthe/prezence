<?php
namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Staff;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\TeachingAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->user()?->role ?? 'guest';

        return Inertia::render('Dashboard', [
            'type' => $type,
            'payload' => match ($type) {
                'admin' => [
                    'numberOfStudents' => Student::count(),
                    'numberOfTeachers' => Teacher::count(),
                    'numberOfStaffs' => Staff::count(),
                ],
                'teacher' => [
                    ...$this->teacherDashboardPayload($request),
                ],
                default => [],
            },
        ]);
    }

    private function teacherDashboardPayload(Request $request): array
    {
        $teacher = $request->user()->profile;
        abort_unless($teacher instanceof Teacher, 403);

        $assignments = $teacher->teachingAssignments()
            ->with(['subject', 'classRoom.students'])
            ->get();

        $requestedAssignmentId = $request->integer('assignment_id');
        $selectedAssignment = $requestedAssignmentId
            ? $assignments->firstWhere('id', $requestedAssignmentId)
            : $assignments->first();

        $classSummaries = $assignments
            ->unique('class_id')
            ->map(function (TeachingAssignment $assignment): array {
                $students = $assignment->classRoom->students;

                return [
                    'id' => $assignment->classRoom->id,
                    'name' => $assignment->classRoom->name,
                    'level' => $assignment->classRoom->level,
                    'male_count' => $students->where('gender', 'male')->count(),
                    'female_count' => $students->where('gender', 'female')->count(),
                ];
            })
            ->values();

        $weekStart = now()->startOfWeek(Carbon::MONDAY);
        $weekEnd = $weekStart->copy()->addDays(5)->endOfDay();
        $attendanceByDate = collect();

        if ($selectedAssignment) {
            $attendanceByDate = Attendance::query()
                ->where('teaching_assignment_id', $selectedAssignment->id)
                ->whereBetween('attendance_date', [$weekStart, $weekEnd])
                ->selectRaw('DATE(attendance_date) as attendance_date')
                ->selectRaw("SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present_count")
                ->selectRaw("SUM(CASE WHEN status = 'excused' THEN 1 ELSE 0 END) as excused_count")
                ->selectRaw("SUM(CASE WHEN status = 'sick' THEN 1 ELSE 0 END) as sick_count")
                ->selectRaw("SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent_count")
                ->groupBy('attendance_date')
                ->orderBy('attendance_date')
                ->get()
                ->keyBy('attendance_date');
        }

        $attendanceSummary = collect(range(0, 5))->map(function (int $day) use ($weekStart, $attendanceByDate): array {
            $date = $weekStart->copy()->addDays($day)->toDateString();
            $summary = $attendanceByDate->get($date);

            return [
                'attendance_date' => $date,
                'present_count' => $summary ? (int) $summary->present_count : null,
                'excused_count' => $summary ? (int) $summary->excused_count : null,
                'sick_count' => $summary ? (int) $summary->sick_count : null,
                'absent_count' => $summary ? (int) $summary->absent_count : null,
            ];
        });

        return [
            'assignments' => $assignments->map(function (TeachingAssignment $assignment): array {
                return [
                    'id' => $assignment->id,
                    'subject' => ['name' => $assignment->subject->name],
                    'class_room' => [
                        'name' => $assignment->classRoom->name,
                        'level' => $assignment->classRoom->level,
                    ],
                ];
            })->values(),
            'selectedAssignmentId' => $selectedAssignment?->id,
            'classSummaries' => $classSummaries,
            'attendanceSummary' => $attendanceSummary,
            'weekLabel' => sprintf(
                'Minggu ke %d tahun %d',
                $weekStart->isoWeek(),
                $weekStart->isoWeekYear(),
            ),
        ];
    }
}
