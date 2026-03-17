<?php

namespace Database\Factories;

use App\Models\Trip;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Trip>
 */
namespace Database\Factories;

class TripFactory extends Factory
{
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('+1 week', '+1 month');
        $endDate = fake()->dateTimeInInterval($startDate, '+14 days');

        return [
            'title' => fake()->city() . ' Getaway',
            'destination' => fake()->city() . ', ' . fake()->country(),
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
            'cover_image_url' => null,
            'budget_amount' => fake()->randomFloat(2, 500, 5000),
            'budget_currency' => 'USD',
        ];
    }
}
