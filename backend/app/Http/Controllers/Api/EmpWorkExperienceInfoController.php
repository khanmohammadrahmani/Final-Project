<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmployeeWorkExperienceInfo;
use Illuminate\Http\Request;

class EmpWorkExperienceInfoController extends Controller
{
    // ================= LIST =================
    public function index()
    {
        return response()->json(
            EmployeeWorkExperienceInfo::where('is_deleted', false)->get()
        );
    }

    // ================= STORE =================
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|integer',
            'job_title' => 'required|string|max:150',
            'start_date' => 'required|date',
            'organization' => 'required|string|max:255',

            'responsibilities' => 'nullable|string',
            'experience_description' => 'nullable|string',
            'end_date' => 'nullable|date',
            'organization_address' => 'nullable|string',
            'reference_email' => 'nullable|email',
            'reference_phone' => 'nullable|string',
        ]);

        $data = EmployeeWorkExperienceInfo::create($validated);

        return response()->json([
            'message' => 'Work experience created successfully',
            'data' => $data
        ]);
    }

    // ================= SHOW =================
    public function show($id)
    {
        return response()->json(
            EmployeeWorkExperienceInfo::findOrFail($id)
        );
    }

    // ================= UPDATE =================
    public function update(Request $request, $id)
    {
        $exp = EmployeeWorkExperienceInfo::findOrFail($id);

        $validated = $request->validate([
            'employee_id' => 'sometimes|integer',
            'job_title' => 'sometimes|string|max:150',
            'start_date' => 'sometimes|date',
            'organization' => 'sometimes|string|max:255',

            'responsibilities' => 'nullable|string',
            'experience_description' => 'nullable|string',
            'end_date' => 'nullable|date',
            'organization_address' => 'nullable|string',
            'reference_email' => 'nullable|email',
            'reference_phone' => 'nullable|string',
        ]);

        $exp->update($validated);

        return response()->json([
            'message' => 'Work experience updated successfully',
            'data' => $exp
        ]);
    }

    // ================= DELETE (SOFT) =================
    public function destroy($id)
    {
        $exp = EmployeeWorkExperienceInfo::findOrFail($id);

        $exp->update([
            'is_deleted' => true
        ]);

        return response()->json([
            'message' => 'Deleted successfully'
        ]);
    }
}