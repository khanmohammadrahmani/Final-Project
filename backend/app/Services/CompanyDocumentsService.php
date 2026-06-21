<?php

namespace App\Services;

use App\Models\CompanyDocuments;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CompanyDocumentsService
{
    public function getAll()
    {
        return CompanyDocuments::where('is_deleted', false)
            ->latest('document_id')
            ->get();
    }

    public function getById(int $id)
    {
        return CompanyDocuments::findOrFail($id);
    }

    public function create(array $data)
    {
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {

            $path = $data['file']->store('company-documents', 'public');

            // ✅ IMPORTANT FIX: save with /storage prefix
            $data['doc_file_url'] = 'storage/' . $path;

            unset($data['file']);
        }

        return CompanyDocuments::create($data);
    }

    public function update(int $id, array $data)
    {
        $document = CompanyDocuments::findOrFail($id);

        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {

            if (
                !empty($document->doc_file_url)
            ) {
                // remove "storage/" prefix before deleting
                $oldPath = str_replace('storage/', '', $document->doc_file_url);

                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $path = $data['file']->store('company-documents', 'public');
            $data['doc_file_url'] = 'storage/' . $path;

            unset($data['file']);
        }

        unset($data['file']);

        $document->update($data);

        return $document->fresh();
    }

    public function delete(int $id): bool
    {
        $document = CompanyDocuments::findOrFail($id);

        $document->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}