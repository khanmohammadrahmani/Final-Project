<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EquipmentInfoRequest;
use App\Services\EquipmentInfoService;
use Illuminate\Http\JsonResponse;

class EquipmentInfoController extends Controller
{
    public function __construct(
        private EquipmentInfoService $service
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'data' => $this->service->getAll(),
        ]);
    }

    public function show($id): JsonResponse
    {
        return response()->json([
            'data' => $this->service->getById($id),
        ]);
    }

    public function store(EquipmentInfoRequest $request): JsonResponse
    {
        $item = $this->service->create($request->validated());

        return response()->json([
            'message' => 'Equipment created successfully',
            'data'    => $item,
        ], 201);
    }

    public function update(EquipmentInfoRequest $request, $id): JsonResponse
    {
        $item = $this->service->update($id, $request->validated());

        return response()->json([
            'message' => 'Equipment updated successfully',
            'data'    => $item,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Equipment deleted successfully',
        ]);
    }
}
