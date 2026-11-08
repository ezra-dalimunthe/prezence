<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('teaching_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained('teachers')->restrictOnDelete();
            $table->foreignId('subject_id')->constrained('subjects')->restrictOnDelete();
            $table->foreignId('class_id')->constrained('class_rooms')->restrictOnDelete();
            $table->timestamps();
            // Pass a custom short name to prevent the "Identifier name too long" error
            $table->unique(['teacher_id', 'subject_id', 'class_id'], 'assignments_t_s_c_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teaching_assignments');
    }
};
