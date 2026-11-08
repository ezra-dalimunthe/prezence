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
            [$teachers[0], 'Bahasa Indonesia', 'X-TKJ-1'],
            [$teachers[0], 'Bahasa Indonesia', 'X-RPL-1'],
            [$teachers[1], 'Pendidikan Pancasila','X-TKJ-1'],
            [$teachers[1], 'Pendidikan Pancasila','X-RPL-1'],
            [$teachers[2], 'Matematika', 'X-TKJ-1'],
            [$teachers[2], 'Matematika', 'X-RPL-1'],
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
