<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImportStudentRequest;
use App\Services\StudentImportService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ImportStudentController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/Import/Students');
    }

    public function store(ImportStudentRequest $request, StudentImportService $service): RedirectResponse
    {
        try {
            $result = $service->import($request->file('file')->getRealPath());
        } catch (\RuntimeException $exception) {
            return back()->withErrors(['file' => $exception->getMessage()]);
        }

        return to_route('admin.import.students.create')->with('importResult', $result);
    }
}
