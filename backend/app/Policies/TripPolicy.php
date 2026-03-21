<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Trip;

class TripPolicy
{

    public function view(User $user, Trip $trip)
    {
        return $trip->members()->where('user_id', $user->id)->exists();
    }


    public function update(User $user, Trip $trip)
    {
        return $trip->members()
            ->where('user_id', $user->id)
            ->exists();
    }

    public function delete(User $user, Trip $trip)
    {
        return $trip->members()
            ->where('user_id', $user->id)
            ->exists();
    }
}
