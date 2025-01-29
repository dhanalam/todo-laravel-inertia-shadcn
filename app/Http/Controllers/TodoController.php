<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Todo\CreateTodo;
use App\Actions\Todo\GetTodos;
use App\Http\Requests\Todo\CreateTodoRequest;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

final class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, GetTodos $getTodos): Response
    {
        $todos = $getTodos($request->user());

        return Inertia::render('Todo/List', compact('todos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Todo/Create');
    }

    /**
     * Store todo
     */
    public function store(CreateTodoRequest $request, CreateTodo $createTodo): RedirectResponse
    {
        $createTodo(
            $request->user(),
            [
                'title' => $request->get('title'),
                'description' => $request->get('description'),
                'completed' => $request->get('completed'),
            ]
        );

        flash('Todo created successfully!');

        return redirect()->route('todos.index');
    }

    /**
     * Get All Ids
     *
     * @return JsonResponse
     */
    public function getAllIds(Request $request)
    {
        $todoIds = Todo::where('user_id', $request->user()->id)->get()->pluck('id');

        return response()->json($todoIds);
    }
}
