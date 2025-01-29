<?php

declare(strict_types=1);

namespace App\Actions\Todo;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

final class GetTodos
{
    /**
     * Create Todo
     *
     * @return LengthAwarePaginator<Todo>
     */
    public function __invoke(User $user): LengthAwarePaginator
    {
        $sortField = request()->input('sortBy', 'created_at');
        $sortDirection = request()->input('sortDirection', 'desc');
        $title = request()->input('title');

        $query = Todo::where('user_id', $user->id)
            ->when($title, function ($query, $title) {
                return $query->where('title', 'like', "%$title%");
            });

        if ($sortField && $sortDirection) {
            $query->orderBy($sortField, $sortDirection);
        } else {
            $query->orderBy('id', 'desc');
        }

        return $query->paginate(12);
    }
}
