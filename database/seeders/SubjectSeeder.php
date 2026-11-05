<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'Bahasa Indonesia',
            'Sejarah',
            'Pendidikan Pancasila',
            'PJOK',
            'Bahasa Inggris',
            'Matematika',
        ] as $name) {
            Subject::firstOrCreate(['name' => $name]);
        }
    }
}
