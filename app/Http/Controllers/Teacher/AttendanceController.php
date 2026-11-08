<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttendanceRequest;
use App\Models\Attendance;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
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

        $attendanceDate = request()->date('attendance_date') ?? now();
        $assignment = $assignments->firstWhere('id', request()->integer('assignment_id'));
        $students = $assignment?->classRoom->students()->orderBy('name')->get() ?? collect();

        $existingAttendance = $assignment
            ? Attendance::where('teaching_assignment_id', $assignment->id)
                ->whereDate('attendance_date', $attendanceDate)
                ->whereIn('student_id', $students->pluck('id'))
                ->get()
                ->keyBy('student_id')
            : collect();


        $attendances = $students->mapWithKeys(function ($item) use ($existingAttendance) {
            $exists = $existingAttendance[$item->id] ?? null;
            return [$item->id => $exists ? $exists->status : "present"];
        });
        
        return Inertia::render('Teacher/Attendances/Index', [
            'assignments' => $assignments,
            'selectedAssignmentId' => $assignment?->id,
            'students' => $students,
            'attendanceDate' => $attendanceDate->format('Y-m-d'),
            'attendances' => $attendances
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
            if (!in_array((int) $studentId, $studentIds, true)) {
                throw ValidationException::withMessages([
                    'attendances' => 'Student tidak berasal dari ClassRoom assignment.',
                ]);
            }
        }

        DB::transaction(function () use ($request, $assignment, $date): void {
            foreach ($request->input('attendances') as $studentId => $status) {
                $attendance = Attendance::query()
                    ->where('student_id', $studentId)
                    ->where('teaching_assignment_id', $assignment->id)
                    ->where('attendance_date', $date)
                    ->firstOrNew([
                        'student_id' => $studentId,
                        'teaching_assignment_id' => $assignment->id,
                        'attendance_date' => $date,
                    ]);

                $attendance->fill(['status' => $status]);

                if ($attendance->isDirty()) {
                    $attendance->save();
                }
            }
        });

        return to_route('teacher.attendances.index', [
            'assignment_id' => $assignment->id,
            'attendance_date' => $date,
        ])->with('success', 'Attendance berhasil disimpan.');
    }
}
