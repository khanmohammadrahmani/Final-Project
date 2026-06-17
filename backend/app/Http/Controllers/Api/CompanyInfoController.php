<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyInfoRequest;
use App\Models\CompanyInfo;
use App\Services\CompanyInfoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class CompanyInfoController extends Controller
{
    public function __construct(
        private CompanyInfoService $companyService
    ) {}

    public function index(): JsonResponse
    {
        return response()->json(
            $this->companyService->getAll()
        );
    }

    public function show(int $company): JsonResponse
    {
        return response()->json(
            $this->companyService->getById($company)
        );
    }

    public function store(CompanyInfoRequest $request): JsonResponse
    {
        $data = $request->all();

        if ($request->hasFile('company_logo_url')) {

            $file = $request->file('company_logo_url');

            $filename =
            'company_' .
            time() .
            '.' .
            $file->getClientOriginalExtension();

            $data['company_logo_url'] =
            $file->storeAs(
                'company',
                $filename,
                'public'
            );
        }

        $company = $this->companyService->create($data);

        return response()->json([
            'message' => 'Company created successfully',
            'data'    => $company,
        ], 201);
    }

    public function update(
        CompanyInfoRequest $request,
        int $company
    ): JsonResponse {

        $data = $request->all();

        $companyData = CompanyInfo::findOrFail($company);

        if ($request->hasFile('company_logo_url')) {

            // Delete old logo
            if (
                $companyData->company_logo_url &&
                Storage::disk('public')->exists($companyData->company_logo_url)
            ) {
                Storage::disk('public')->delete(
                    $companyData->company_logo_url
                );
            }

            $file = $request->file('company_logo_url');

            $filename =
            $company .
            '_' .
            time() .
            '.' .
            $file->getClientOriginalExtension();

            $data['company_logo_url'] =
            $file->storeAs(
                'company',
                $filename,
                'public'
            );
        }

        $updated = $this->companyService->update(
            $company,
            $data
        );

        return response()->json([
            'message' => 'Company updated successfully',
            'data'    => $updated,
        ]);
    }

    public function destroy(int $company): JsonResponse
    {
        $companyData = CompanyInfo::findOrFail($company);

        if (
            $companyData->company_logo_url &&
            Storage::disk('public')->exists($companyData->company_logo_url)
        ) {
            Storage::disk('public')->delete(
                $companyData->company_logo_url
            );
        }

        $this->companyService->delete($company);

        return response()->json([
            'message' => 'Company deleted successfully',
        ]);
    }
}
