<x-mail::message>
    # Welcome to TMS

    A due date for task {{ $task }} assigned to you by {{ $user }} is close.
    Please prioritize this task with diligence.

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
