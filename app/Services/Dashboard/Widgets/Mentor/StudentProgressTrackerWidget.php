<?php

namespace App\Services\Dashboard\Widgets\Mentor;

use App\Models\User;
use App\Services\Dashboard\Widget;

class StudentProgressTrackerWidget implements Widget
{
    public function getKey(): string
    {
        return 'student_progress_tracker';
    }

    public function authorize(User $user): bool
    {
        return $user->hasRole('mentor');
    }

    public function getData(User $user): array
    {
        return [
            'needs_attention' => 5,
            'top_performers' => 10,
            'average_completion' => '68%'
        ];
    }

    public function getPriority(): int
    {
        return 20;
    }

    public function getCacheTTL(): ?int
    {
        return 600;
    }
}
