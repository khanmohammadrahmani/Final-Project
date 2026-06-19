<?php

use App\Http\Controllers\Api\CashTransactionInfoController;
use App\Http\Controllers\Api\CompanyDocumentsController;
use App\Http\Controllers\Api\CompanyInfoController;
use App\Http\Controllers\Api\CustomerInfoController;
use App\Http\Controllers\Api\EmpDocumentController;
use App\Http\Controllers\Api\EmployeeHiringInfoController;
use App\Http\Controllers\Api\EmployeeInfoController;
use App\Http\Controllers\Api\EmployeeSalaryInfoController;
use App\Http\Controllers\Api\EmpSalaryPaymentInfoController;
use App\Http\Controllers\Api\EmpWorkExperienceInfoController;
use App\Http\Controllers\Api\EquipmentInfoController;
use App\Http\Controllers\Api\ExpenseInfoController;
use App\Http\Controllers\Api\InvoiceInfoController;
use App\Http\Controllers\Api\MaterialInfoController;
use App\Http\Controllers\Api\OrderInfoController;
use App\Http\Controllers\Api\OrderItemInfoController;
use App\Http\Controllers\Api\PaymentInfoController;
use App\Http\Controllers\Api\StockTransactionInfoController;
use App\Http\Controllers\Api\SupplierInfoController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

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

// ================= EMPLOYEES =================

Route::apiResource(
    'employees',
    EmployeeInfoController::class
);

// ================= EMPLOYEE DOCUMENTS =================

Route::apiResource(
    'emp-documents',
    EmpDocumentController::class
);

// ================= EMPLOYEE HIRING =================

Route::apiResource(
    'employee-hiring-info',
    EmployeeHiringInfoController::class
);

// ================= EMPLOYEE SALARY =================

Route::apiResource(
    'employee-salaries',
    EmployeeSalaryInfoController::class
);

// ================= EMPLOYEE SALARY PAYMENTS =================

Route::apiResource(
    'emp-salary-payments',
    EmpSalaryPaymentInfoController::class
);

// ================= CUSTOMER INFO =================

Route::apiResource(
    'customers',
    CustomerInfoController::class
);

Route::apiResource(
    'emp-work-experience',
    EmpWorkExperienceInfoController::class
);
Route::apiResource('customers', CustomerInfoController::class);
Route::apiResource(
    'suppliers',
    SupplierInfoController::class
);
// MATERIALS

Route::apiResource(
    'materials',
    MaterialInfoController::class
);
Route::apiResource(
    'orders',
    OrderInfoController::class
);
Route::apiResource('order-items', OrderItemInfoController::class);
Route::apiResource(
    'stock-transactions',
    StockTransactionInfoController::class
);
Route::apiResource('expenses', ExpenseInfoController::class);

Route::apiResource('invoices', InvoiceInfoController::class);
Route::apiResource('payments', PaymentInfoController::class);
Route::apiResource('cash-transactions', CashTransactionInfoController::class);
Route::apiResource('equipment', EquipmentInfoController::class);
