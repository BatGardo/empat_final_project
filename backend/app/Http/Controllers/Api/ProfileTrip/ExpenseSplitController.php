<?php

namespace App\Http\Controllers\Api\ProfileTrip;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Expense;
use App\Models\ExpenseSplit;

class ExpenseSplitController extends Controller
{
    /**
     * Update expense split payment status
     */
    public function update(Request $request, Trip $trip, Expense $expense, ExpenseSplit $split)
    {
        $this->authorize('update', $trip);

        // Defend from mismatched expense split
        if ($split->expense_id !== $expense->id) {
            abort(404);
        }

        $split->update([
            'is_paid' => $request->boolean('is_paid')
        ]);

        return response()->json(
            $trip->expenses()->with('splits.user')->get()
        );
    }
}
