<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Expense extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'trip_id',
        'title',
        'total_amount',
        'currency',
        'date',
        'paid_by',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
            'total_amount' => 'decimal:2',
        ];
    }

    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }

    public function paidBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'paid_by');
    }

    public function splits(): HasMany
    {
        return $this->hasMany(ExpenseSplit::class);
    }
}
