<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {}

    public function index(): JsonResponse
    {
        return response()->json($this->userService->getAll());
    }

    public function show(int $user): JsonResponse
    {
        return response()->json($this->userService->getById($user));
    }

    // ================= CREATE =================
    public function store(UserRequest $request): JsonResponse
    {
        $data = $request->all();

        // PASSWORD FIX
        if (!empty($data['password_hash'])) {
            $data['password_hash'] = Hash::make($data['password_hash']);
        }

        // IMAGE UPLOAD
        if ($request->hasFile('user_photo_url')) {
            $data['user_photo_url'] = $request->file('user_photo_url')
                ->store('users', 'public');
        }

        $user = $this->userService->create($data);

        return response()->json([
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
    }

    // ================= UPDATE =================
    public function update(UserRequest $request, int $user): JsonResponse
    {
        $data = $request->all();

        // PASSWORD FIX
        if (!empty($data['password_hash'])) {
            $data['password_hash'] = Hash::make($data['password_hash']);
        } else {
            unset($data['password_hash']);
        }

        // IMAGE UPLOAD
        if ($request->hasFile('user_photo_url')) {
            $data['user_photo_url'] = $request->file('user_photo_url')
                ->store('users', 'public');
        }

        $updated = $this->userService->update($user, $data);

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $updated
        ]);
    }

    // ================= DELETE =================
    public function destroy(int $user): JsonResponse
    {
        $this->userService->delete($user);

        return response()->json([
            'message' => 'User deleted successfully.',
        ]);
    }

    // ================= LOGIN =================
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('user_email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password_hash)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user'    => $user,
        ]);
    }
}