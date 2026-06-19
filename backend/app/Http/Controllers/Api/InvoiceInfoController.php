<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\InvoiceInfoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvoiceInfoController extends Controller
{
    public function __construct(
        private InvoiceInfoService $service
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
        $invoice = $this->service->create($request->all());

        return response()->json([
            'message' => 'Invoice created successfully',
            'data'    => $invoice,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $invoice = $this->service->update($id, $request->all());

        return response()->json([
            'message' => 'Invoice updated successfully',
            'data'    => $invoice,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Invoice deleted successfully',
        ]);
    }
}
