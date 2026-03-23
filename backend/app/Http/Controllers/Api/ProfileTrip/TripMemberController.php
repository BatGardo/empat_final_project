<?php

namespace App\Http\Controllers\Api\ProfileTrip;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\User;

class TripMemberController extends Controller
{
    public function index(Trip $trip)
    {
        $this->authorize('view', $trip);

        return response()->json(
            $trip->members
        );
    }

    public function store(Request $request, Trip $trip)
    {
        $this->authorize('update', $trip);

        $trip->members()->attach($request->user_id);

        return response()->json([
            'message' => 'User added'
        ]);
    }

    public function destroy(Trip $trip, User $user)
    {
        $this->authorize('update', $trip);

        $trip->members()->detach($user->id);

        return response()->json([
            'message' => 'User removed'
        ]);
    }
}
