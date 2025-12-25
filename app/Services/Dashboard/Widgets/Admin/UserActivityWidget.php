<?php

namespace App\Services\Dashboard\Widgets\Admin;

use App\Models\User;
use App\Services\Dashboard\Widget;

class UserActivityWidget implements Widget
{
    public function getKey(): string
    {
        return 'user_activity_snapshot';
    }

    public function authorize(User $user): bool
    {
        return $user->hasRole('super_admin');
    }

    public function getData(User $user): array
    {
        return [
            'new_registrations' => User::where('created_at', '>=', now()->subDays(7))->count(),
            'recent_logins' => 45, // Dummy
            'churn_rate' => '2%',
        ];
    }

    public function getPriority(): int
    {
        return 20;
    }

    public function getCacheTTL(): ?int
    {
        return 300;
    }
}
