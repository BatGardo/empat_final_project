<?php

namespace App\Http\Controllers\Api\ProfileTrip;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\TripPlan;

class TripPlanController extends Controller
{
    public function index(Trip $trip)
    {
        $this->authorize('view', $trip);

        return response()->json(
            $trip->plans
        );
    }

    public function store(Request $request, Trip $trip)
    {
        $this->authorize('update', $trip);

        $plan = $trip->plans()->create([
            'title' => $request->title,
            'date' => $request->date
        ]);

        return response()->json($plan);
    }

    public function update(Request $request, Trip $trip, TripPlan $plan)
    {
        $this->authorize('update', $trip);

        if ($plan->trip_id !== $trip->id) {
            abort(404);
        }

        $plan->update($request->all());

        return response()->json($plan);
    }


    public function destroy(Trip $trip, TripPlan $plan)
    {
        $this->authorize('update', $trip);

        $plan->delete();

        return response()->json([
            'message' => 'Plan item deleted'
        ]);
    }
}
