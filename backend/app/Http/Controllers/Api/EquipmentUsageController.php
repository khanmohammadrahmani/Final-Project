<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EquipmentUsageRequest;
use App\Services\EquipmentUsageService;

class EquipmentUsageController extends Controller
{
    protected $service;

    public function __construct(EquipmentUsageService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json([
            'data' => $this->service->getAll()
        ]);
    }

    public function store(EquipmentUsageRequest $request)
    {
        $data = $request->validated();

        return response()->json([
            'message' => 'Created successfully',
            'data' => $this->service->create($data)
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => $this->service->getById($id)
        ]);
    }

    public function update(EquipmentUsageRequest $request, $id)
    {
        $data = $request->validated();

        return response()->json([
            'message' => 'Updated successfully',
            'data' => $this->service->update($id, $data)
        ]);
    }

    public function destroy($id)
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Deleted successfully'
        ]);
    }
}