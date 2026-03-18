<?php

namespace App\Http\Controllers\Api\Shared;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\TripInvite;
use Illuminate\Support\Str;

class TripInviteController extends Controller
{
    /**
     * Create a new invite for the trip
     */
    public function create(Trip $trip)
    {
        $this->authorize('update', $trip);

        $invite = TripInvite::create([
            'trip_id' => $trip->id,
            'token' => (string) Str::uuid(),
            'expires_at' => now()->addDays(7)
        ]);

        return response()->json([
            'invite_token' => $invite->token,
            'accept_api_url' => url("/api/invite/{$invite->token}")
        ]);
    }

    /**
     * Accept an invite using the token and join the trip
     */
    public function accept(Request $request, $token)
    {
        $invite = TripInvite::where('token', $token)
            ->where('expires_at', '>', now())
            ->firstOrFail();

        $trip = $invite->trip;

        $trip->members()->syncWithoutDetaching([
            $request->user()->id => ['role' => 'member']
        ]);

        return response()->json([
            'message' => 'Joined trip',
            'trip_id' => $trip->id
        ]);
    }
}
