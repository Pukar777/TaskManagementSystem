<x-mail::message>
    # Welcome to TMS

    A new task {{ $task }} has been assigned to you by {{ $user }}.
    The priority of task is {{ $priority }}.

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
