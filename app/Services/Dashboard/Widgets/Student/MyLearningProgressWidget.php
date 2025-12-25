<?php

namespace App\Services\Dashboard\Widgets\Student;

use App\Models\User;
use App\Services\Dashboard\Widget;

class MyLearningProgressWidget implements Widget
{
    public function getKey(): string
    {
        return 'my_learning_progress';
    }

    public function authorize(User $user): bool
    {
        return $user->hasRole('student');
    }

    public function getData(User $user): array
    {
        return [
            'completed_modules' => 12,
            'total_modules' => 20,
            'current_streak' => 5,
            'next_goal' => 'Finish "Testing" Device',
        ];
    }

    public function getPriority(): int
    {
        return 10;
    }

    public function getCacheTTL(): ?int
    {
        return null;
    }
}
