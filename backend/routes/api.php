<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CompanyInfoController;

// ================= USERS =================

Route::prefix('users')->group(function () {

    Route::get('/', [UserController::class, 'index']);
    Route::get('/{user}', [UserController::class, 'show']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/{user}', [UserController::class, 'update']);
    Route::delete('/{user}', [UserController::class, 'destroy']);
});

Route::post('/login', [UserController::class, 'login']);


// ================= COMPANY INFO =================

Route::apiResource(
    'company-info',
    CompanyInfoController::class
);