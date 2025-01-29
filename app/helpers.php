<?php

declare(strict_types=1);

if (! function_exists('flash')) {
    function flash(string $message, App\Enums\MessageType $type = App\Enums\MessageType::Success): void
    {
        if (! in_array($type, App\Enums\MessageType::all())) {
            $type = App\Enums\MessageType::Success->value;
        }
        session()->flash('message', $message);
        session()->flash('messageType', $type);
    }
}
