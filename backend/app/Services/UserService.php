<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
        $data['password_hash'] = Hash::make($data['password_hash']);

        return User::create($data);
    }

    public function update(int $id, array $data)
    {
        $user = User::findOrFail($id);

        if (
            isset($data['password_hash']) &&
            ! empty($data['password_hash'])
        ) {
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

        $user->delete();

        return true;
    }
}
