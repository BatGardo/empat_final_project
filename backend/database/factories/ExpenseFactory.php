<?php

namespace Database\Factories;

use App\Models\Expense;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Expense>
 */
class ExpenseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'trip_id' => Trip::factory(),
            'title' => fake()->randomElement(['Flight', 'Hotel', 'Dinner', 'Transport', 'Activities']),
            'total_amount' => fake()->randomFloat(2, 10, 1000),
            'currency' => fake()->randomElement(['USD', 'EUR', 'GBP']),
            'date' => fake()->dateTimeBetween('-1 month', 'now'),
            'paid_by' => User::factory(),
        ];
    }
}
