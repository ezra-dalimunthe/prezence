<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Teacher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $teacher = $request->user()->profile;
        abort_unless($teacher instanceof Teacher, 403);

        $assignments = $teacher->teachingAssignments()
            ->with(['subject', 'classRoom'])
            ->orderBy('id')
            ->get();

        $month = $request->integer('month', now()->month);
        $year = $request->integer('year', now()->year);

        if ($month < 1 || $month > 12) {
            $month = now()->month;
        }

        if ($year < 2000 || $year > 2100) {
            $year = now()->year;
        }

        $selectedAssignment = null;
        $dates = collect();
        $rows = collect();

        if ($request->filled('teaching_assignment_id')) {
            $selectedAssignment = $teacher->teachingAssignments()
                ->with('classRoom.students')
                ->findOrFail($request->integer('teaching_assignment_id'));

            $startDate = Carbon::create($year, $month, 1)->startOfDay();

            $dates = collect(range(1, $startDate->daysInMonth))
                ->map(fn (int $day) => $startDate->copy()->day($day)->toDateString())
                ->values();

            $attendance = Attendance::query()
                ->where('teaching_assignment_id', $selectedAssignment->id)
                ->whereBetween('attendance_date', [
                    $startDate->toDateString(),
                    $startDate->copy()->endOfMonth()->toDateString(),
                ])
                ->get()
                ->keyBy(fn (Attendance $item) => $item->student_id.':'.$item->attendance_date->toDateString());

            $statusLabels = [
                'present' => 'H',
                'excused' => 'I',
                'sick' => 'S',
                'absent' => 'A',
            ];

            $rows = $selectedAssignment->classRoom->students
                ->sortBy('name')
                ->map(function ($student) use ($dates, $attendance, $statusLabels) {
                    $statuses = [];
                    $summary = [
                        'present' => 0,
                        'excused' => 0,
                        'sick' => 0,
                        'absent' => 0,
                    ];

                    foreach ($dates as $date) {
                        $record = $attendance->get($student->id.':'.$date);
                        $status = $record?->status;
                        $statuses[$date] = $status ? ($statusLabels[$status] ?? null) : null;

                        if ($status !== null && array_key_exists($status, $summary)) {
                            $summary[$status]++;
                        }
                    }

                    return [
                        'student_id' => $student->id,
                        'nis' => $student->nis,
                        'name' => $student->name,
                        'statuses' => $statuses,
                        'summary' => $summary,
                    ];
                })
                ->values();
        }

        return Inertia::render('Teacher/Reports/Index', [
            'assignments' => $assignments,
            'selectedAssignmentId' => $selectedAssignment?->id,
            'month' => $month,
            'year' => $year,
            'dates' => $dates,
            'rows' => $rows,
        ]);
    }
}
