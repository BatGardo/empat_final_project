<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trip extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'destination',
        'start_date',
        'end_date',
        'cover_image_url',
        'budget_amount',
        'budget_currency',
    ];

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'trip_members')->withPivot('role');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function plans(): HasMany
    {
        return $this->hasMany(TripPlan::class);
    }
}
