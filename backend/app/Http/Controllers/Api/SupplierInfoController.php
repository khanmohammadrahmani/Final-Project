<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SupplierInfoRequest;
use App\Services\SupplierInfoService;
use Illuminate\Http\JsonResponse;

class SupplierInfoController extends Controller
{
    public function __construct(
        private SupplierInfoService $supplierInfoService
    ) {
    }

    public function index(): JsonResponse
    {
        return response()->json(
            $this->supplierInfoService->getAll()
        );
    }

    public function show(
        int $supplier
    ): JsonResponse {
        return response()->json(
            $this->supplierInfoService->getById(
                $supplier
            )
        );
    }

    public function store(
        SupplierInfoRequest $request
    ): JsonResponse {
        $supplier =
        $this->supplierInfoService->create(
            $request->validated()
        );

        return response()->json([
            'message' =>
            'Supplier created successfully.',
            'data'    => $supplier,
        ], 201);
    }

    public function update(
        SupplierInfoRequest $request,
        int $supplier
    ): JsonResponse {
        $supplier =
        $this->supplierInfoService->update(
            $supplier,
            $request->validated()
        );

        return response()->json([
            'message' =>
            'Supplier updated successfully.',
            'data'    => $supplier,
        ]);
    }

    public function destroy(
        int $supplier
    ): JsonResponse {
        $this->supplierInfoService->delete(
            $supplier
        );

        return response()->json([
            'message' =>
            'Supplier deleted successfully.',
        ]);
    }
}
