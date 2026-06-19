<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderInfoRequest;
use App\Services\OrderInfoService;
use Illuminate\Http\JsonResponse;

class OrderInfoController extends Controller
{
    public function __construct(
        private OrderInfoService $service
    ) {}

    public function index(): JsonResponse
    {
        return response()->json(
            $this->service->getAll()
        );
    }

    public function show(int $order): JsonResponse
    {
        return response()->json(
            $this->service->getById($order)
        );
    }

    public function store(
        OrderInfoRequest $request
    ): JsonResponse {
        $order = $this->service->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Order created successfully',
            'data'    => $order,
        ], 201);
    }

    public function update(
        OrderInfoRequest $request,
        int $order
    ): JsonResponse {
        $order = $this->service->update(
            $order,
            $request->validated()
        );

        return response()->json([
            'message' => 'Order updated successfully',
            'data'    => $order,
        ]);
    }

    public function destroy(
        int $order
    ): JsonResponse {
        $this->service->delete($order);

        return response()->json([
            'message' => 'Order deleted successfully',
        ]);
    }
}
