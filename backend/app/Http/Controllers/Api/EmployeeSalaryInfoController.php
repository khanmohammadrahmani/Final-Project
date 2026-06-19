<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeSalaryInfoRequest;
use App\Services\EmployeeSalaryInfoService;
use Illuminate\Http\JsonResponse;

class EmployeeSalaryInfoController extends Controller
{
    public function __construct(
        private EmployeeSalaryInfoService $service
    ) {
    }

    public function index(): JsonResponse
    {
        return response()->json(
            $this->service->getAll()
        );
    }

    public function show(
        int $employeeSalary
    ): JsonResponse {
        return response()->json(
            $this->service->getById(
                $employeeSalary
            )
        );
    }

    public function store(
        EmployeeSalaryInfoRequest $request
    ): JsonResponse {

        $salary = $this->service->create(
            $request->validated()
        );

        return response()->json([
            'message' =>
            'Employee salary created successfully.',
            'data'    => $salary,
        ], 201);
    }

    public function update(
        EmployeeSalaryInfoRequest $request,
        int $employeeSalary
    ): JsonResponse {

        $salary = $this->service->update(
            $employeeSalary,
            $request->validated()
        );

        return response()->json([
            'message' =>
            'Employee salary updated successfully.',
            'data'    => $salary,
        ]);
    }

    public function destroy(
        int $employeeSalary
    ): JsonResponse {

        $this->service->delete(
            $employeeSalary
        );

        return response()->json([
            'message' =>
            'Employee salary deleted successfully.',
        ]);
    }
}
