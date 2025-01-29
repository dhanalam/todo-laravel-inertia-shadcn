<?php

declare(strict_types=1);

it('creates a todo', function () {

    $user = App\Models\User::factory()->create();

    $response = $this->actingAs($user)
        ->from(route('todos.index'))
        ->post(route('todos.store'), [
            'user_id' => $user->id,
            'title' => 'first todo',
            'description' => 'first todo description',
        ]);

    $response->assertRedirect(route('todos.index'))
        ->assertSessionHasNoErrors();

    $todos = App\Models\Todo::all();

    expect($todos)->toHaveCount(1)
        ->and($todos->first()->user_id)->toBe($user->id)
        ->and($todos->first()->title)->toBe('first todo');

});
