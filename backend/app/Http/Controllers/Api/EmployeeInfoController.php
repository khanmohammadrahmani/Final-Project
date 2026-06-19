<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeInfoRequest;
use App\Services\EmployeeInfoService;
use Illuminate\Http\JsonResponse;

class EmployeeInfoController extends Controller
{
    public function __construct(
        private EmployeeInfoService $service
    ) {}

    public function index(): JsonResponse
    {
        return response()->json(
            $this->service->getAll()
        );
    }

    public function show(int $employee): JsonResponse
    {
        return response()->json(
            $this->service->getById($employee)
        );
    }

    public function store(EmployeeInfoRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('emp_photo')) {
            $data['emp_photo'] = $request->file('emp_photo');
        }

        $emp = $this->service->create($data);

        return response()->json([
            'message' => 'Employee created successfully',
            'data' => $emp
        ], 201);
    }

    public function update(EmployeeInfoRequest $request, int $employee): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('emp_photo')) {
            $data['emp_photo'] = $request->file('emp_photo');
        }

        $emp = $this->service->update($employee, $data);

        return response()->json([
            'message' => 'Employee updated successfully',
            'data' => $emp
        ]);
    }

    public function destroy(int $employee): JsonResponse
    {
        $this->service->delete($employee);

        return response()->json([
            'message' => 'Employee deleted successfully'
        ]);
    }
}