<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEquipmentMaintenanceRequest;
use App\Services\EquipmentMaintenanceService;
use Illuminate\Http\Request;

class EquipmentMaintenanceController extends Controller
{
    protected $service;

    public function __construct(EquipmentMaintenanceService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->getAll());
    }

    public function store(StoreEquipmentMaintenanceRequest $request)
    {
        $data = $request->validated();
        $result = $this->service->create($data);

        return response()->json([
            'message' => 'Created successfully',
            'data' => $result
        ]);
    }

    public function show($id)
    {
        return response()->json($this->service->getById($id));
    }

    public function update(StoreEquipmentMaintenanceRequest $request, $id)
    {
        $data = $request->validated();
        $result = $this->service->update($id, $data);

        return response()->json([
            'message' => 'Updated successfully',
            'data' => $result
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