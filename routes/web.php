<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\StaffController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\TeacherController;

use Inertia\Inertia;

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/guide', function () {
    return Inertia::render('Guide');
})->name('guide');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/login', [AuthController::class, 'showLogin'])
    ->middleware('guest')
    ->name('login');

Route::post('/login', [AuthController::class, 'login'])
    ->middleware('guest');

Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('logout');

    Route::middleware('role:admin')
        ->prefix('admin')
        ->name('admin.')
        ->group(function () {
            Route::get('/teachers', [TeacherController::class, 'index'])
                ->name('teachers.index');
            Route::get('/teachers/create', [TeacherController::class, 'create'])
                ->name('teachers.create');
            Route::post('/teachers', [TeacherController::class, 'store'])
                ->name('teachers.store');
            Route::get('/teachers/{teacher}/edit', [TeacherController::class, 'edit'])
                ->name('teachers.edit');
            Route::put('/teachers/{teacher}', [TeacherController::class, 'update'])
                ->name('teachers.update');
            Route::post('/teachers/{teacher}/account', [TeacherController::class, 'createAccount'])
                ->name('teachers.account');

            Route::get('/students', [StudentController::class, 'index'])
                ->name('students.index');
            Route::get('/students/create', [StudentController::class, 'create'])
                ->name('students.create');
            Route::post('/students', [StudentController::class, 'store'])
                ->name('students.store');
            Route::get('/students/{student}/edit', [StudentController::class, 'edit'])
                ->name('students.edit');
            Route::put('/students/{student}', [StudentController::class, 'update'])
                ->name('students.update');
            Route::post('/students/{student}/account', [StudentController::class, 'createAccount'])
                ->name('students.account');

            Route::get('/staff', [StaffController::class, 'index'])
                ->name('staff.index');
            Route::get('/staff/create', [StaffController::class, 'create'])
                ->name('staff.create');
            Route::post('/staff', [StaffController::class, 'store'])
                ->name('staff.store');
            Route::get('/staff/{staff}/edit', [StaffController::class, 'edit'])
                ->name('staff.edit');
            Route::put('/staff/{staff}', [StaffController::class, 'update'])
                ->name('staff.update');
            Route::post('/staff/{staff}/account', [StaffController::class, 'createAccount'])
                ->name('staff.account');
        });
});
