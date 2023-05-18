<x-mail::message>
    # Welcome to TMS

    We recently received a request to reset the password to your account: {{ $email }}
    Click the button below to change password.

    <x-mail::button :url="'{{ $link }}'">
        Change Password
    </x-mail::button>

    If above button is not working <a href="{{ $link }}">Click Here</a><br>

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
