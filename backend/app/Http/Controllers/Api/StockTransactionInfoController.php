<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StockTransactionInfoRequest;
use App\Services\StockTransactionInfoService;
use Illuminate\Http\JsonResponse;

class StockTransactionInfoController extends Controller
{
    public function __construct(
        private StockTransactionInfoService $service
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

    public function store(StockTransactionInfoRequest $request): JsonResponse
    {
        $item = $this->service->create($request->validated());

        return response()->json([
            'message' => 'Stock transaction created successfully',
            'data'    => $item,
        ], 201);
    }

    public function update(StockTransactionInfoRequest $request, int $id): JsonResponse
    {
        $item = $this->service->update($id, $request->validated());

        return response()->json([
            'message' => 'Stock transaction updated successfully',
            'data'    => $item,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Stock transaction deleted successfully',
        ]);
    }
}
