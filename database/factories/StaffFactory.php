<?php

namespace Database\Factories;

use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Staff>
 */
class StaffFactory extends Factory
{
    protected $model = Staff::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'position' => fake()->randomElement([
                'Kepala Sekolah',
                'Tata Usaha',
                'Staff Administrasi',
            ]),
        ];
    }
}
