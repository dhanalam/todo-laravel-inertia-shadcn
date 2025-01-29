<?php

declare(strict_types=1);

namespace App\Actions\Todo;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Support\Facades\DB;

final class CreateTodo
{
    /**
     * Create Todo
     *
     * @param  array{title:string, description:string, completed: int}  $attributes
     */
    public function __invoke(User $user, array $attributes): void
    {
        DB::transaction(function () use ($user, $attributes) {
            Todo::create([
                'user_id' => $user->id,
                'title' => $attributes['title'],
                'description' => $attributes['description'],
                'completed' => $attributes['completed'],
            ]);
        });
    }
}
