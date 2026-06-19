<?php

namespace App\Services;

use App\Models\CompanyDocuments;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CompanyDocumentsService
{
    // ================= GET ALL =================
    public function getAll()
    {
        return CompanyDocuments::where('is_deleted', false)
            ->latest('document_id')
            ->get();
    }

    // ================= GET BY ID =================
    public function getById(int $id)
    {
        return CompanyDocuments::findOrFail($id);
    }

    // ================= CREATE =================
    public function create(array $data)
    {
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {

            $data['doc_file_url'] = $data['file']->store(
                'company-documents',
                'public'
            );

            unset($data['file']);
        }

        return CompanyDocuments::create($data);
    }

    // ================= UPDATE (FIXED) =================
    public function update(int $id, array $data)
    {
        $document = CompanyDocuments::findOrFail($id);

        // 🔥 IMPORTANT FIX: only handle file if exists
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {

            // delete old file safely
            if (
                !empty($document->doc_file_url) &&
                Storage::disk('public')->exists($document->doc_file_url)
            ) {
                Storage::disk('public')->delete($document->doc_file_url);
            }

            $data['doc_file_url'] = $data['file']->store(
                'company-documents',
                'public'
            );

            unset($data['file']);
        }

        // 🔥 CRITICAL FIX: never overwrite file column with null
        unset($data['file']);

        $document->update($data);

        return $document->fresh();
    }

    // ================= DELETE =================
    public function delete(int $id): bool
    {
        $document = CompanyDocuments::findOrFail($id);

        $document->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}