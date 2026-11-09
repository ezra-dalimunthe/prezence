<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeachingAssignmentRequest;
use App\Http\Requests\UpdateTeachingAssignmentRequest;
use App\Models\ClassRoom;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\TeachingAssignment;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class TeachingAssignmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/TeachingAssignments/Index', [
            'assignments' => TeachingAssignment::with(['teacher', 'subject', 'classRoom'])
                ->orderBy('teacher_id')->paginate(10)->withQueryString(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/TeachingAssignments/Create', $this->options());
    }

    public function store(StoreTeachingAssignmentRequest $request): RedirectResponse
    {
        TeachingAssignment::create($request->validated());
        return to_route('admin.teaching-assignments.index')->with('success', 'TeachingAssignment berhasil dibuat.');
    }

    public function edit(TeachingAssignment $teachingAssignment)
    {
        return Inertia::render('Admin/TeachingAssignments/Edit', [
            'assignment' => $teachingAssignment,
            ...$this->options(),
        ]);
    }

    public function update(UpdateTeachingAssignmentRequest $request, TeachingAssignment $teachingAssignment): RedirectResponse
    {
        $teachingAssignment->update($request->validated());
        return to_route('admin.teaching-assignments.index')->with('success', 'TeachingAssignment berhasil diperbarui.');
    }

    public function destroy(TeachingAssignment $teachingAssignment): RedirectResponse
    {
        try {
            $teachingAssignment->delete();
        } catch (\Throwable) {
            return back()->withErrors(['delete' => 'TeachingAssignment masih digunakan oleh Attendance.']);
        }

        return to_route('admin.teaching-assignments.index')->with('success', 'TeachingAssignment berhasil dihapus.');
    }

    private function options(): array
    {
        return [
            'teachers' => Teacher::orderBy('name')->get(['id', 'name']),
            'subjects' => Subject::orderBy('name')->get(['id', 'name']),
            'classRooms' => ClassRoom::orderBy('level')->orderBy('name')->get(['id', 'name', 'level']),
        ];
    }
}
