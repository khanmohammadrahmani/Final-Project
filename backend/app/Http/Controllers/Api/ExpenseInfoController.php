<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ExpenseInfoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExpenseInfoController extends Controller
{
    public function __construct(
        private ExpenseInfoService $service
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
        $expense = $this->service->create($request->all());

        return response()->json([
            'message' => 'Expense created successfully',
            'data'    => $expense,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $expense = $this->service->update($id, $request->all());

        return response()->json([
            'message' => 'Expense updated successfully',
            'data'    => $expense,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Expense deleted successfully',
        ]);
    }
}
