<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClassRoomRequest;
use App\Http\Requests\UpdateClassRoomRequest;
use App\Models\ClassRoom;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ClassRoomController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ClassRooms/Index', [
            'classRooms' => ClassRoom::orderBy('level')->orderBy('name')->paginate(10)->withQueryString(),
        ]);
    }

    public function create() { return Inertia::render('Admin/ClassRooms/Create'); }

    public function store(StoreClassRoomRequest $request): RedirectResponse
    {
        ClassRoom::create($request->validated());
        return to_route('admin.class-rooms.index')->with('success', 'ClassRoom berhasil dibuat.');
    }

    public function edit(ClassRoom $classRoom) { return Inertia::render('Admin/ClassRooms/Edit', ['classRoom' => $classRoom]); }

    public function update(UpdateClassRoomRequest $request, ClassRoom $classRoom): RedirectResponse
    {
        $classRoom->update($request->validated());
        return to_route('admin.class-rooms.index')->with('success', 'ClassRoom berhasil diperbarui.');
    }

    public function destroy(ClassRoom $classRoom): RedirectResponse
    {
        try {
            $classRoom->delete();
        } catch (\Throwable) {
            return back()->withErrors(['delete' => 'ClassRoom masih digunakan oleh Student atau TeachingAssignment.']);
        }

        return to_route('admin.class-rooms.index')->with('success', 'ClassRoom berhasil dihapus.');
    }
}
