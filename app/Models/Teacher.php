<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'mobile_phone'];

    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'profile');
    }

    public function teachingAssignments(): HasMany
    {
        return $this->hasMany(TeachingAssignment::class);
    }
}
