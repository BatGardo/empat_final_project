<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Trip;
use App\Models\Task;
use App\Models\Expense;
use App\Models\Notification;
use App\Models\TripPlan;

class TestUserTripsSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'admin@example.com')->first();

        if (!$user) {
            $this->command->info("Test user not found. Create it first.");
            return;
        }

        // Create 2 trips for the Test user
        $trips = Trip::factory(2)->create();

        foreach ($trips as $trip) {
            // Add Test user as owner of the trip
            $trip->members()->attach($user->id, ['role' => 'owner']);

            // Trip plans
            TripPlan::factory(rand(2, 4))->create([
                'trip_id' => $trip->id,
            ]);

            // Tasks
            Task::factory(rand(3, 5))->create([
                'trip_id' => $trip->id,
                'assigned_to' => $user->id,
                'created_by' => $user->id,
            ]);

            // Expenses
            Expense::factory(rand(2, 4))->create([
                'trip_id' => $trip->id,
                'paid_by' => $user->id,
            ]);

            // Notifications
            Notification::factory(rand(3, 5))->create([
                'trip_id' => $trip->id,
                'user_id' => $user->id,
            ]);
        }
    }
}
