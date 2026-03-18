<?php

namespace Database\Factories;

use App\Models\Trip;
use App\Models\TripPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

class TripPlanFactory extends Factory
{
    protected $model = TripPlan::class;

    public function definition(): array
    {
        return [
            'trip_id' => Trip::factory(),
            'title' => $this->faker->sentence(3),
            'date' => $this->faker->dateTimeBetween('now', '+1 month'),
        ];
    }
}
