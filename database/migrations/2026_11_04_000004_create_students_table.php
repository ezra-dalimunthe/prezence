<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_id')
                ->constrained('class_rooms')
                ->restrictOnDelete();
            $table->string('nis')->unique();
            $table->string('name');
            $table->string('gender');
            $table->date('birth_date');
            $table->string('birth_place', 100);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
