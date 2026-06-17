<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function getAll()
    {
        return User::latest('user_id')->get();
    }

    public function getById(int $id)
    {
        return User::findOrFail($id);
    }

    public function create(array $data)
    {
        // ================= PASSWORD =================
        if (!empty($data['password_hash'])) {
            $data['password_hash'] = Hash::make($data['password_hash']);
        }

        // ================= IMAGE SAFE CHECK =================
        if (isset($data['user_photo_url']) && $data['user_photo_url'] instanceof \Illuminate\Http\UploadedFile) {
            $path = $data['user_photo_url']->store('users', 'public');
            $data['user_photo_url'] = $path;
        }

        return User::create($data);
    }

   public function update(int $id, array $data)
{
    $user = User::findOrFail($id);

    // ✔ DELETE OLD IMAGE IF NEW ONE EXISTS
    if (!empty($data['user_photo_url']) && $user->user_photo_url) {
        Storage::disk('public')->delete($user->user_photo_url);
    }

    if (!empty($data['password_hash'])) {
        $data['password_hash'] = Hash::make($data['password_hash']);
    } else {
        unset($data['password_hash']);
    }

    $user->update($data);

    return $user->fresh();
}

    public function delete(int $id): bool
    {
        $user = User::findOrFail($id);

        if ($user->user_photo_url) {
            Storage::disk('public')->delete($user->user_photo_url);
        }

        $user->delete();

        return true;
    }
}