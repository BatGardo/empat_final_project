<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Last trips
        $trips = $user->trips()
            ->latest()
            ->limit(9)
            ->get();

        // Last notifications
        $notifications = $user->notifications()
            ->latest()
            ->limit(6)
            ->get();

        // Nearest deadlines
        $deadlines = Task::whereHas('trip', function ($q) use ($user) {
            $q->whereHas('members', function ($q2) use ($user) {
                $q2->where('user_id', $user->id);
            });
        })
        ->whereNotNull('due_date')
        ->where('status', '!=', 'done')
        ->orderBy('due_date')
        ->limit(5)
        ->get();

        return response()->json([
            'trips' => $trips,
            'notifications' => $notifications,
            'deadlines' => $deadlines
        ]);
    }
}
