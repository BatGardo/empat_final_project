<?php

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Dashboard\DashboardController;
use App\Http\Controllers\Api\Shared\NotificationController;
use App\Http\Controllers\Api\Shared\TripInviteController;
use App\Http\Controllers\Api\ProfileTrip\TripController;
use App\Http\Controllers\Api\ProfileTrip\TripMemberController;
use App\Http\Controllers\Api\ProfileTrip\TripPlanController;
use App\Http\Controllers\Api\ProfileTrip\TaskController;
use App\Http\Controllers\Api\ProfileTrip\ExpenseController;


//Authorization routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

//Authorized routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->scopeBindings()->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Trip routes
    Route::apiResource('trips', TripController::class);

    // Nested routes for trip members, plans, tasks, expenses
    Route::prefix('trips/{trip}')->group(function () {

        Route::get('members', [TripMemberController::class, 'index']);
        Route::post('members', [TripMemberController::class, 'store']);
        Route::delete('members/{user}', [TripMemberController::class, 'destroy']);

        Route::get('plan', [TripPlanController::class, 'index']);
        Route::post('plan', [TripPlanController::class, 'store']);
        Route::put('plan/{plan}', [TripPlanController::class, 'update']);
        Route::delete('plan/{plan}', [TripPlanController::class, 'destroy']);

        Route::get('tasks', [TaskController::class, 'index']);
        Route::post('tasks', [TaskController::class, 'store']);
        Route::put('tasks/{task}', [TaskController::class, 'update']);
        Route::delete('tasks/{task}', [TaskController::class, 'destroy']);

        Route::get('expenses', [ExpenseController::class, 'index']);
        Route::post('expenses', [ExpenseController::class, 'store']);
        Route::put('expenses/{expense}', [ExpenseController::class, 'update']);
        Route::delete('expenses/{expense}', [ExpenseController::class, 'destroy']);

    });

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);

    Route::post('trips/{trip}/invite', [TripInviteController::class, 'create']);
    Route::post('invite/{token}', [TripInviteController::class, 'accept']);
});
