<x-mail::message>
    # Welcome to TMS

    We have successfully reviewed your application. We have created your account as per request. You can login using
    following link to get started.

    <x-mail::button :url="'{{ $link }}'">
        Sign In
    </x-mail::button>

    If above button is not working <a href="{{ $link }}">Click Here</a><br>

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
