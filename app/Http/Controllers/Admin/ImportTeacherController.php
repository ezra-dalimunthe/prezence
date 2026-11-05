<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImportTeacherRequest;
use App\Services\TeacherImportService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ImportTeacherController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/Import/Teachers');
    }

    public function store(ImportTeacherRequest $request, TeacherImportService $service): RedirectResponse
    {
        try {
            $result = $service->import($request->file('file')->getRealPath());
        } catch (\RuntimeException $exception) {
            return back()->withErrors(['file' => $exception->getMessage()]);
        }

        return to_route('admin.import.teachers.create')->with('importResult', $result);
    }
}
