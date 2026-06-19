<?php

namespace App\Services;

use App\Models\EmployeeDocuments;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class EmpDocumentService
{
    public function getAll()
    {
        return EmployeeDocuments::with('employeeInfo')
            ->where('is_deleted', false)
            ->latest('document_id')
            ->get();
    }

    public function getById(int $id)
    {
        return EmployeeDocuments::with('employeeInfo')
            ->findOrFail($id);
    }

    public function create(array $data)
    {
        if (
            isset($data['file']) &&
            $data['file'] instanceof UploadedFile
        ) {
            $data['doc_file_url'] = $data['file']
                ->store('employee-documents', 'public');

            unset($data['file']);
        }

        return EmployeeDocuments::create($data);
    }

    public function update(
        int $id,
        array $data
    ) {
        $document = EmployeeDocuments::findOrFail($id);

        if (
            isset($data['file']) &&
            $data['file'] instanceof UploadedFile
        ) {

            if (
                $document->doc_file_url &&
                Storage::disk('public')->exists(
                    $document->doc_file_url
                )
            ) {
                Storage::disk('public')->delete(
                    $document->doc_file_url
                );
            }

            $data['doc_file_url'] = $data['file']
                ->store('employee-documents', 'public');

            unset($data['file']);
        }

        $document->update($data);

        return $document->fresh();
    }

    public function delete(int $id): bool
    {
        $document = EmployeeDocuments::findOrFail($id);

        $document->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}