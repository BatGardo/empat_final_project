<?php

namespace App\Http\Controllers\Api\ProfileTrip;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Trip $trip)
    {
        $this->authorize('view', $trip);

        return response()->json(
            $trip->tasks
        );
    }

    public function store(Request $request, Trip $trip)
    {
        $this->authorize('update', $trip);

        $task = Task::create([
            'trip_id' => $trip->id,
            'title' => $request->title,
            'status' => $request->status ?? 'pending',
            'importance' => $request->importance ?? 'medium',
            'assigned_to' => $request->assigned_to ?? $request->user()->id,
            'due_date' => $request->due_date,
            'created_by' => $request->user()->id,
        ]);

        // multiple assignees
        if ($request->has('assignees')) {
            $task->assignees()->sync($request->assignees);
        }

        return response()->json($task);
    }


    public function update(Request $request, Trip $trip, Task $task)
    {
        $this->authorize('update', $trip);

        $task->update($request->only([
            'title',
            'status',
            'importance',
            'assigned_to',
            'due_date'
        ]));

        if ($request->has('assignees')) {
            $task->assignees()->sync($request->assignees);
        }

        return response()->json($task);
    }

    public function destroy(Trip $trip, Task $task)
    {
        $this->authorize('update', $trip);

        $task->delete();

        return response()->json([
            'message' => 'Task deleted'
        ]);
    }
}
