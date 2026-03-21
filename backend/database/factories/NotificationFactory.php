<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Notification>
 */
class NotificationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'trip_id' => Trip::factory(),
            'type' => fake()->randomElement(['invite', 'expense_added', 'task_assigned', 'trip_updated']),
            'message' => fake()->sentence(),
            'is_read' => fake()->boolean(20),
        ];
    }
}
