<?php

namespace App\Http\Controllers\Api\ProfileTrip;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Expense;
use App\Models\ExpenseSplit;

class ExpenseController extends Controller
{
    public function index(Trip $trip)
    {
        $this->authorize('view', $trip);

        return response()->json(
            $trip->expenses()->with('splits.user')->get()
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
            foreach ($request->splits as $split) {
                $expense->splits()->create([
                    'user_id' => $split['user_id'],
                    'is_paid' => $split['is_paid'] ?? false,
                ]);
            }
        }

        return response()->json($expense->load('splits'));
    }

    public function updateSplit(Request $request, Trip $trip, Expense $expense, ExpenseSplit $split)
    {
        $this->authorize('update', $trip);

        if ($split->expense_id !== $expense->id) {
            abort(404);
        }

        $split->update([
            'is_paid' => $request->is_paid
        ]);

        return response()->json($split);
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
