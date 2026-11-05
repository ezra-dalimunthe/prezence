<?php

namespace Database\Seeders;

use App\Models\ClassRoom;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\TeachingAssignment;
use Illuminate\Database\Seeder;

class TeachingAssignmentSeeder extends Seeder
{
    public function run(): void
    {
        $teachers = [
            Teacher::firstOrCreate(['mobile_phone' => '081234567890'], ['name' => 'Budi Santoso']),
            Teacher::firstOrCreate(['mobile_phone' => '081234567891'], ['name' => 'Siti Rahmawati']),
            Teacher::firstOrCreate(['mobile_phone' => '081234567892'], ['name' => 'Andi Pratama']),
        ];

        $assignments = [
            [$teachers[0], 'Bahasa Indonesia', 'X-A'],
            [$teachers[0], 'Sejarah', 'X-B'],
            [$teachers[1], 'Pendidikan Pancasila', 'XI-A'],
            [$teachers[1], 'Bahasa Inggris', 'XI-B'],
            [$teachers[2], 'Matematika', 'XII-A'],
            [$teachers[2], 'PJOK', 'XII-B'],
        ];

        foreach ($assignments as [$teacher, $subjectName, $className]) {
            $subject = Subject::where('name', $subjectName)->firstOrFail();
            $classRoom = ClassRoom::where('name', $className)->firstOrFail();

            TeachingAssignment::firstOrCreate([
                'teacher_id' => $teacher->id,
                'subject_id' => $subject->id,
                'class_id' => $classRoom->id,
            ]);
        }
    }
}
