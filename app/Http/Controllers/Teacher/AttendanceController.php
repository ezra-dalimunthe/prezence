<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttendanceRequest;
use App\Models\Attendance;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {
        $teacher = request()->user()->profile;
        abort_unless($teacher instanceof Teacher, 403);

        $assignments = $teacher->teachingAssignments()
            ->with(['subject', 'classRoom'])
            ->get();

        $assignment = $assignments->firstWhere('id', request()->integer('assignment_id'));
        $students = $assignment?->classRoom->students()->orderBy('name')->get() ?? collect();

        return Inertia::render('Teacher/Attendances/Index', [
            'assignments' => $assignments,
            'selectedAssignmentId' => $assignment?->id,
            'students' => $students,
            'attendanceDate' => request()->date('attendance_date')?->format('Y-m-d') ?? now()->format('Y-m-d'),
        ]);
    }

    public function store(StoreAttendanceRequest $request): RedirectResponse
    {
        $teacher = $request->user()->profile;
        abort_unless($teacher instanceof Teacher, 403);

        $assignment = $teacher->teachingAssignments()
            ->with('classRoom')
            ->findOrFail($request->integer('teaching_assignment_id'));

        $date = $request->string('attendance_date')->toString();
        $studentIds = $assignment->classRoom->students()->pluck('id')->all();

        foreach (array_keys($request->input('attendances')) as $studentId) {
            abort_unless(in_array((int) $studentId, $studentIds, true), 422, 'Student tidak berasal dari ClassRoom assignment.');

            if (Attendance::where('student_id', $studentId)
                ->where('teaching_assignment_id', $assignment->id)
                ->whereDate('attendance_datetime', $date)
                ->exists()) {
                return back()->withErrors(['attendances' => "Attendance untuk Student {$studentId} pada tanggal tersebut sudah ada."]);
            }
        }

        DB::transaction(function () use ($request, $assignment, $date): void {
            $attendanceDateTime = Carbon::parse($date)->setTimeFromTimeString(now()->format('H:i:s'));

            foreach ($request->input('attendances') as $studentId => $status) {
                Attendance::create([
                    'student_id' => $studentId,
                    'teaching_assignment_id' => $assignment->id,
                    'attendance_datetime' => $attendanceDateTime,
                    'status' => $status,
                ]);
            }
        });

        return to_route('teacher.attendances.index')->with('success', 'Attendance berhasil disimpan.');
    }
}
