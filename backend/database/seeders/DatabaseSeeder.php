<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //User::factory(5)->create();

        User::firstOrCreate(
            ['email' => 'admin@example.com'], // уникальный ключ
            [
                'name' => 'Admin User',
                'password' => bcrypt('password123'),
                'default_timezone' => 'Europe/London',
            ]
        );
        $this->call(TestUserTripsSeeder::class);
    }
}
