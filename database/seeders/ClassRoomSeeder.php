<?php

namespace Database\Seeders;

use App\Models\ClassRoom;
use Illuminate\Database\Seeder;

class ClassRoomSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['name' => 'X-TKJ-1', 'level' => 'X'],
            ['name' => 'X-RPL-1', 'level' => 'X'],
            ['name' => 'XI-TKJ-1', 'level' => 'XI'],
            ['name' => 'XI-RPL-1', 'level' => 'XI'],
            ['name' => 'XII-TKJ-1', 'level' => 'XII'],
            ['name' => 'XII-RPL-1', 'level' => 'XII'],
        ] as $classRoom) {
            ClassRoom::firstOrCreate(['name' => $classRoom['name']], $classRoom);
        }
    }
}
