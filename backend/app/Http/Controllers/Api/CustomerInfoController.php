<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerInfoRequest;
use App\Services\CustomerInfoService;

class CustomerInfoController extends Controller
{
    protected $service;

    public function __construct(CustomerInfoService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->getAll());
    }

    public function store(CustomerInfoRequest $request)
    {
        $data = $this->service->create($request->validated());

        return response()->json([
            'message' => 'Customer created successfully',
            'data' => $data
        ]);
    }

    public function show($id)
    {
        return response()->json($this->service->getById($id));
    }

    public function update(CustomerInfoRequest $request, $id)
    {
        $data = $this->service->update($id, $request->validated());

        return response()->json([
            'message' => 'Customer updated successfully',
            'data' => $data
        ]);
    }

    public function destroy($id)
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Customer deleted successfully'
        ]);
    }
}