<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmpDocumentRequest;
use App\Services\EmpDocumentService;
use Illuminate\Http\JsonResponse;

class EmpDocumentController extends Controller
{
    public function __construct(
        private EmpDocumentService $service
    ) {
    }

    public function index(): JsonResponse
    {
        return response()->json(
            $this->service->getAll()
        );
    }

    public function show(
        int $document
    ): JsonResponse {
        return response()->json(
            $this->service->getById($document)
        );
    }

    public function store(
        EmpDocumentRequest $request
    ): JsonResponse {

        $data = $request->validated();

        if ($request->hasFile('file')) {
            $data['file'] =
                $request->file('file');
        }

        $document =
            $this->service->create($data);

        return response()->json([
            'message' =>
                'Document created successfully',
            'data' => $document,
        ], 201);
    }

    public function update(
        EmpDocumentRequest $request,
        int $document
    ): JsonResponse {

        $data = $request->validated();

        if ($request->hasFile('file')) {
            $data['file'] =
                $request->file('file');
        }

        $document =
            $this->service->update(
                $document,
                $data
            );

        return response()->json([
            'message' =>
                'Document updated successfully',
            'data' => $document,
        ]);
    }

    public function destroy(
        int $document
    ): JsonResponse {

        $this->service->delete(
            $document
        );

        return response()->json([
            'message' =>
                'Document deleted successfully',
        ]);
    }
}