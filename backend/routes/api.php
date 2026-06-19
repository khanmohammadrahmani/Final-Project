<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CompanyInfoController;
use App\Http\Controllers\Api\CompanyDocumentsController;
use App\Http\Controllers\Api\EmployeeInfoController;
use App\Http\Controllers\Api\EmpDocumentController;

Route::apiResource(
    'emp-documents',
    EmpDocumentController::class
);



// ================= USERS =================

Route::prefix('users')->group(function () {

    Route::get('/', [UserController::class, 'index']);

    Route::get('/{user}', [UserController::class, 'show']);

    Route::post('/', [UserController::class, 'store']);

    Route::put('/{user}', [UserController::class, 'update']);

    Route::delete('/{user}', [UserController::class, 'destroy']);
});

// ================= AUTH =================

Route::post('/login', [UserController::class, 'login']);

// ================= COMPANY INFO =================

Route::apiResource(
    'company-info',
    CompanyInfoController::class
);

// ================= COMPANY DOCUMENTS =================

Route::apiResource(
    'company-documents',
    CompanyDocumentsController::class
);
Route::apiResource('employees', EmployeeInfoController::class);
Route::apiResource( 'emp-documents', EmpDocumentController::class);
