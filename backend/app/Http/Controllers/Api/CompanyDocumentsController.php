<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyDocumentsRequest;
use App\Services\CompanyDocumentsService;
use Illuminate\Http\JsonResponse;

class CompanyDocumentsController extends Controller
{
    public function __construct(
        private CompanyDocumentsService $companyDocumentsService
    ) {}

    // ================= INDEX =================
    public function index(): JsonResponse
    {
        return response()->json(
            $this->companyDocumentsService->getAll()
        );
    }

    // ================= SHOW =================
    public function show(int $document): JsonResponse
    {
        return response()->json(
            $this->companyDocumentsService->getById($document)
        );
    }

    // ================= STORE =================
    public function store(CompanyDocumentsRequest $request): JsonResponse
    {
        $data = $request->validated();

        // file upload
        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file');
        }

        $document = $this->companyDocumentsService->create($data);

        return response()->json([
            'message' => 'Company document created successfully.',
            'data'    => $document,
        ], 201);
    }

    // ================= UPDATE (FIXED FOR FILE UPLOAD) =================
    public function update(CompanyDocumentsRequest $request, int $document): JsonResponse
    {
        $data = $request->validated();

        // IMPORTANT: file handling
        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file');
        }

        $updatedDocument = $this->companyDocumentsService->update(
            $document,
            $data
        );

        return response()->json([
            'message' => 'Company document updated successfully.',
            'data'    => $updatedDocument,
        ]);
    }

    // ================= DELETE =================
    public function destroy(int $document): JsonResponse
    {
        $this->companyDocumentsService->delete($document);

        return response()->json([
            'message' => 'Company document deleted successfully.',
        ]);
    }
}