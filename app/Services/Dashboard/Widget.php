<?php

namespace App\Services\Dashboard;

use App\Models\User;

interface Widget
{
    /**
     * The unique identifier for the widget (used by frontend).
     */
    public function getKey(): string;

    /**
     * Determine if the user is allowed to see this widget.
     * 
     * @param User $user
     * @return bool
     */
    public function authorize(User $user): bool;

    /**
     * Fetch the data required for the widget.
     * 
     * @param User $user
     * @return array
     */
    public function getData(User $user): array;

    /**
     * The display priority. Lower numbers appear first.
     * 
     * @return int
     */
    public function getPriority(): int;

    /**
     * Cache Time-To-Live in seconds. Return null to disable caching.
     * 
     * @return int|null
     */
    public function getCacheTTL(): ?int;
}
