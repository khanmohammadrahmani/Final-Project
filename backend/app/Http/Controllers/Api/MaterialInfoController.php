<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MaterialInfoRequest;
use App\Services\MaterialInfoService;
use Illuminate\Http\JsonResponse;

class MaterialInfoController extends Controller
{
    public function __construct(
        private MaterialInfoService $materialService
    ) {
    }

    public function index(): JsonResponse
    {
        return response()->json(
            $this->materialService->getAll()
        );
    }

    public function show(
        int $material
    ): JsonResponse {
        return response()->json(
            $this->materialService->getById(
                $material
            )
        );
    }

    public function store(
        MaterialInfoRequest $request
    ): JsonResponse {
        $material = $this->materialService->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Material created successfully.',
            'data'    => $material,
        ], 201);
    }

    public function update(
        MaterialInfoRequest $request,
        int $material
    ): JsonResponse {
        $material = $this->materialService->update(
            $material,
            $request->validated()
        );

        return response()->json([
            'message' => 'Material updated successfully.',
            'data'    => $material,
        ]);
    }

    public function destroy(
        int $material
    ): JsonResponse {
        $this->materialService->delete(
            $material
        );

        return response()->json([
            'message' => 'Material deleted successfully.',
        ]);
    }
}
