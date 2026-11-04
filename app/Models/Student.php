<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_id', 'nis', 'name', 'gender', 'birth_date', 'birth_place',
    ];

    protected function casts(): array
    {
        return ['birth_date' => 'date'];
    }

    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'profile');
    }

    public function classRoom(): BelongsTo
    {
        return $this->belongsTo(ClassRoom::class, 'class_id');
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }
}
