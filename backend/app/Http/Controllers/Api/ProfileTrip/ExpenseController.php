<?php

namespace App\Http\Controllers\Api\ProfileTrip;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Expense;

class ExpenseController extends Controller
{
    public function index(Trip $trip)
    {
        $this->authorize('view', $trip);

        return response()->json(
            $trip->expenses
        );
    }

    public function store(Request $request, Trip $trip)
    {
        $this->authorize('update', $trip);

        $expense = $trip->expenses()->create([
            'title' => $request->title ?? 'No title',
            'total_amount' => $request->total_amount ?? 0,
            'currency' => $request->currency ?? 'USD',
            'date' => $request->date ?? now(),
            'paid_by' => $request->user()->id,
        ]);

        if ($request->has('splits') && is_array($request->splits)) {
            foreach ($request->splits as $split) {
                $expense->splits()->create([
                    'user_id' => $split['user_id'] ?? $request->user()->id,
                    'is_paid' => $split['is_paid'] ?? false,
                ]);
            }
        }

        return response()->json($expense->load('splits'));
    }

    public function update(Request $request, Trip $trip, Expense $expense)
    {
        $this->authorize('update', $trip);

        $expense->update($request->only([
            'title',
            'total_amount',
            'currency',
            'date'
        ]));

        if ($request->has('splits')) {
            $expense->splits()->delete();

            foreach ($request->splits as $split) {
                $expense->splits()->create([
                    'user_id' => $split['user_id'],
                    'is_paid' => $split['is_paid'] ?? false,
                ]);
            }
        }

        return response()->json($expense->load('splits'));
    }


    public function destroy(Trip $trip, Expense $expense)
    {
        $this->authorize('update', $trip);

        $expense->delete();

        return response()->json([
            'message' => 'Expense deleted'
        ]);
    }
}
