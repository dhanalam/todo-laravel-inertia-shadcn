<?php

declare(strict_types=1);

test('to array', function () {

    $todo = App\Models\Todo::factory()->create()->fresh();

    expect(array_keys($todo->toArray()))
        ->toEqual([
            'id',
            'user_id',
            'title',
            'description',
            'completed',
            'created_at',
            'updated_at',
        ]);
});
