<?php

namespace Database\Seeders;

use App\Models\ClassRoom;
use Illuminate\Database\Seeder;

class ClassRoomSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['name' => 'X-A', 'level' => 'X'],
            ['name' => 'X-B', 'level' => 'X'],
            ['name' => 'XI-A', 'level' => 'XI'],
            ['name' => 'XI-B', 'level' => 'XI'],
            ['name' => 'XII-A', 'level' => 'XII'],
            ['name' => 'XII-B', 'level' => 'XII'],
        ] as $classRoom) {
            ClassRoom::firstOrCreate(['name' => $classRoom['name']], $classRoom);
        }
    }
}
