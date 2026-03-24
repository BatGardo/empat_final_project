<?php

namespace App\Http\Controllers\Api\Shared;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->notifications()->latest()->get()
        );
    }


    public function markAsRead(Request $request, Notification $notification)
    {
        if ($notification->user_id !== $request->user()->id) {
            abort(403);
        }

        $notification->update([
            'is_read' => true
        ]);

        return response()->json([
            'message' => 'Notification read'
        ]);
    }
}
