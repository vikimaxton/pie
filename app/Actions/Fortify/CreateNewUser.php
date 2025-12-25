<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'role_id' => \Illuminate\Support\Facades\DB::table('roles')->where('slug', 'student')->value('id'),
            'roll_number' => $this->generateUniqueRollNumber(),
        ]);
    }

    /**
     * Generate a unique 5-digit roll number.
     *
     * @return string
     */
    protected function generateUniqueRollNumber(): string
    {
        do {
            $rollNumber = str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
        } while (User::where('roll_number', $rollNumber)->exists());

        return $rollNumber;
    }
}
