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

    public function store(UserRequest $request): JsonResponse
    {
        $user = $this->userService->create($request->validated());

        return response()->json([
            'message' => 'User created successfully.',
            'data'    => $user,
        ], 201);
    }

    public function update(UserRequest $request, int $user): JsonResponse
    {
        $updatedUser = $this->userService->update($user, $request->validated());

        return response()->json([
            'message' => 'User updated successfully.',
            'data'    => $updatedUser,
        ]);
    }

    public function destroy(int $user): JsonResponse
    {
        $this->userService->delete($user);

        return response()->json([
            'message' => 'User deleted successfully.',
        ]);
    }

    // 🔐 LOGIN FUNCTION (FINAL FIXED)
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        // IMPORTANT: DB field is user_email
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
