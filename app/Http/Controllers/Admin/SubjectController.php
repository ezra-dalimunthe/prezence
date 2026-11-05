<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Models\Subject;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Subjects/Index', [
            'subjects' => Subject::orderBy('name')->paginate(10)->withQueryString(),
        ]);
    }

    public function create() { return Inertia::render('Admin/Subjects/Create'); }

    public function store(StoreSubjectRequest $request): RedirectResponse
    {
        Subject::create($request->validated());
        return to_route('admin.subjects.index')->with('success', 'Subject berhasil dibuat.');
    }

    public function edit(Subject $subject) { return Inertia::render('Admin/Subjects/Edit', ['subject' => $subject]); }

    public function update(UpdateSubjectRequest $request, Subject $subject): RedirectResponse
    {
        $subject->update($request->validated());
        return to_route('admin.subjects.index')->with('success', 'Subject berhasil diperbarui.');
    }

    public function destroy(Subject $subject): RedirectResponse
    {
        try {
            $subject->delete();
        } catch (\Throwable) {
            return back()->withErrors(['delete' => 'Subject masih digunakan oleh TeachingAssignment.']);
        }

        return to_route('admin.subjects.index')->with('success', 'Subject berhasil dihapus.');
    }
}
