<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class TripInvite extends Model
{
    use HasUuids;

    protected $fillable = [
        'trip_id',
        'token',
        'expires_at'
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }
}
