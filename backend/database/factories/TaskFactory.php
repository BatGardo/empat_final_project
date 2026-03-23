<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    public function definition(): array
    {
        return [
            'trip_id' => Trip::factory(),
            'title' => fake()->sentence(4),
            'status' => fake()->randomElement(['pending', 'in_progress', 'done']),
            'importance' => fake()->randomElement(['low', 'medium', 'high']),
            'assigned_to' => null,
            'due_date' => fake()->optional()->dateTimeBetween('now', '+1 month'),
            'created_by' => User::factory(),
        ];
    }
}
