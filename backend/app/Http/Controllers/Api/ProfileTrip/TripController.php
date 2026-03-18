<?php

namespace App\Http\Controllers\Api\ProfileTrip;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;

class TripController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $trips = Trip::whereHas('members', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })->get();

        return response()->json($trips);
    }

    public function store(Request $request)
    {
        $trip = Trip::create([
            'title' => $request->title,
            'destination' => $request->destination,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'budget_amount' => $request->budget_amount,
            'budget_currency' => $request->budget_currency,
        ]);

        $trip->members()->attach($request->user()->id, [
            'role' => 'owner'
        ]);

        return response()->json($trip);
    }


    public function show(Trip $trip)
    {
        $this->authorize('view', $trip);

        return response()->json($trip);
    }

    public function update(Request $request, Trip $trip)
    {
        $this->authorize('update', $trip);

        $trip->update($request->all());

        return response()->json($trip);
    }

    public function destroy(Trip $trip)
    {
        $this->authorize('delete', $trip);

        $trip->delete();

        return response()->json([
            'message' => 'Trip deleted'
        ]);
    }
}
