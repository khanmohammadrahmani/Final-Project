<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentInfoRequest;
use App\Services\PaymentInfoService;
use Illuminate\Http\JsonResponse;

class PaymentInfoController extends Controller
{
    public function __construct(
        private PaymentInfoService $service
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

    public function store(PaymentInfoRequest $request): JsonResponse
    {
        $item = $this->service->create($request->validated());

        return response()->json([
            'message' => 'Payment created successfully',
            'data'    => $item,
        ], 201);
    }

    public function update(PaymentInfoRequest $request, int $id): JsonResponse
    {
        $item = $this->service->update($id, $request->validated());

        return response()->json([
            'message' => 'Payment updated successfully',
            'data'    => $item,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Payment deleted successfully',
        ]);
    }
}
