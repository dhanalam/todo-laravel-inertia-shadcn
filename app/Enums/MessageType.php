<?php

declare(strict_types=1);

namespace App\Enums;

enum MessageType: string
{
    case Success = 'success';
    case Error = 'error';
    case Warning = 'warning';
    case Info = 'info';

    public static function all(): array
    {
        return array_map(fn ($case) => $case->value, self::cases());
    }
}
