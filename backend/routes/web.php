<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/health', function() {
    return response()->json(['status' => 'ok']);
});

// All routes, except /api/* and /health, serve React
Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');
