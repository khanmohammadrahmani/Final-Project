<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderItemInfoRequest;
use App\Services\OrderItemInfoService;
use Illuminate\Http\JsonResponse;

class OrderItemInfoController extends Controller
{
    public function __construct(
        private OrderItemInfoService $service
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'data' => $this->service->getAll(),
        ]);
    }

    public function show(int $id): JsonResponse
    {
        return response()->json([
            'data' => $this->service->getById($id),
        ]);
    }

    public function store(OrderItemInfoRequest $request): JsonResponse
    {
        $item = $this->service->create($request->validated());

        return response()->json([
            'message' => 'Order item created successfully',
            'data'    => $item,
        ], 201);
    }

    public function update(OrderItemInfoRequest $request, int $id): JsonResponse
    {
        $item = $this->service->update($id, $request->validated());

        return response()->json([
            'message' => 'Order item updated successfully',
            'data'    => $item,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Order item deleted successfully',
        ]);
    }
}
