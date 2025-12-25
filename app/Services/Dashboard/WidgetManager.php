<?php

namespace App\Services\Dashboard;

use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class WidgetManager
{
    /**
     * The list of registered widget classes.
     *
     * @var array<string>
     */
    protected array $widgets = [];

    /**
     * Register a widget class.
     *
     * @param string $widgetClass
     * @return self
     */
    public function register(string $widgetClass): self
    {
        if (!in_array(Widget::class, class_implements($widgetClass))) {
            throw new \InvalidArgumentException("Class {$widgetClass} must implement the Widget interface.");
        }
        
        $this->widgets[] = $widgetClass;
        return $this;
    }

    /**
     * Get all authorized widgets for a specific user, with data resolved.
     *
     * @param User $user
     * @return array
     */
    public function getWidgetsForUser(User $user): array
    {
        return collect($this->widgets)
            ->map(fn($class) => app($class)) // Resolve from container
            ->filter(fn(Widget $widget) => $widget->authorize($user))
            ->sortBy(fn(Widget $widget) => $widget->getPriority())
            ->map(function (Widget $widget) use ($user) {
                return [
                    'key' => $widget->getKey(),
                    'data' => $this->resolveData($widget, $user),
                ];
            })
            ->values() // Re-index array
            ->toArray();
    }

    /**
     * Resolve widget data, verifying cache and handling errors safely.
     *
     * @param Widget $widget
     * @param User $user
     * @return array
     */
    protected function resolveData(Widget $widget, User $user): array
    {
        $cacheKey = 'dashboard_widget_' . $widget->getKey() . '_' . $user->id;
        $ttl = $widget->getCacheTTL();

        try {
            if ($ttl) {
                return Cache::remember($cacheKey, $ttl, fn() => $widget->getData($user));
            }

            return $widget->getData($user);
        } catch (\Throwable $e) {
            // Log the error but don't crash the dashboard
            Log::error("Failed to load widget [{$widget->getKey()}]: " . $e->getMessage());
            
            return [
                'error' => true,
                'message' => 'Widget temporarily unavailable',
            ];
        }
    }
}
