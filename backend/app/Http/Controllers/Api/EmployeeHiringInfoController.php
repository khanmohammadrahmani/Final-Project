<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeHiringInfoRequest;
use App\Services\EmployeeHiringInfoService;
use Illuminate\Http\JsonResponse;

class EmployeeHiringInfoController extends Controller
{
    public function __construct(
        private EmployeeHiringInfoService $employeeHiringInfoService
    ) {
    }

    public function index(): JsonResponse
    {
        return response()->json(
            $this->employeeHiringInfoService->getAll()
        );
    }

    public function show(
        int $hiring
    ): JsonResponse {
        return response()->json(
            $this->employeeHiringInfoService->getById($hiring)
        );
    }

    public function store(
        EmployeeHiringInfoRequest $request
    ): JsonResponse {
        $hiring = $this->employeeHiringInfoService->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Employee hiring created successfully.',
            'data'    => $hiring,
        ], 201);
    }

    public function update(
        EmployeeHiringInfoRequest $request,
        int $hiring
    ): JsonResponse {
        $hiring = $this->employeeHiringInfoService->update(
            $hiring,
            $request->validated()
        );

        return response()->json([
            'message' => 'Employee hiring updated successfully.',
            'data'    => $hiring,
        ]);
    }

    public function destroy(
        int $hiring
    ): JsonResponse {
        $this->employeeHiringInfoService->delete(
            $hiring
        );

        return response()->json([
            'message' => 'Employee hiring deleted successfully.',
        ]);
    }
}
