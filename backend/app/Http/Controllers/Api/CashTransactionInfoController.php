<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CashTransactionInfoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CashTransactionInfoController extends Controller
{
    public function __construct(
        private CashTransactionInfoService $service
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

    public function store(Request $request): JsonResponse
    {
        $item = $this->service->create($request->all());

        return response()->json([
            'message' => 'Cash transaction created successfully',
            'data'    => $item,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $item = $this->service->update($id, $request->all());

        return response()->json([
            'message' => 'Cash transaction updated successfully',
            'data'    => $item,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Cash transaction deleted successfully',
        ]);
    }
}
