<?php

namespace Database\Seeders;

use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $staff = Staff::firstOrCreate([
            'name' => 'Administrator',
            'position' => 'Administrator',
        ]);

        User::updateOrCreate(
            ['email' => 'admin@prezence.test'],
            [
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
                'must_change_password' => false,
                'profile_type' => Staff::class,
                'profile_id' => $staff->id,
            ]
        );
    }
}

