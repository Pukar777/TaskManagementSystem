{{-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <h1>Password Reset</h1>
    <p>Please click the following link to reset your password:</p>
    <p><a href="{{ $url }}">{{ $url }}</a></p>

    <form method="POST" action="{{ route('password.update') }}">
    <form method="POST" action="">
        @csrf
        <input type="hidden" name="token" value="{{ $token }}">

        <label for="email">Email:</label>
        <input type="email" name="email" id="email" value="{{$email}}" required>

        <label for="password">New Password:</label>
        <input type="password" name="password" id="password" required>

        <label for="password_confirmation">Confirm New Password:</label>
        <input type="password" name="password_confirmation" id="password_confirmation" required>

        <button type="submit">Reset Password</button>
    </form>
</body>

</html> --}}

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Password Reset Link</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }

        h1 {
            color: #333;
            text-align: center;
        }

        form {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
        }

        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
        }

        button[type="submit"] {
            display: block;
            width: 100%;
            padding: 10px;
            margin-top: 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            cursor: pointer;
        }

        button[type="submit"]:hover {
            background-color: #0062cc;
        }
    </style>
</head>

<body>
    <h1>Password Reset Link</h1>

    <p>Please click the following link to reset your password:</p>
    {{-- <p><a href="{{ $url }}">{{ $url }}</a></p> --}}

    {{-- <p><a href="{{ route('password.reset', $token) }}">{{ route('password.reset', $token) }}</a></p> --}}

    <p><a href="{{ route('password.reset', ['token' => $token, 'email' => $email]) }}">{{ route('password.reset', ['token' => $token, 'email' => $email]) }}</a></p>



    {{-- <form method="POST" action="{{ route('password.update', $token) }} "> --}}
        
    {{-- <form method="POST" action=""> --}}
        {{-- @csrf --}}
        {{-- @method('PUT') --}}
        {{-- <input type="hidden" name="_token" value="{{ csrf_token() }}"> --}}
        {{-- <input type="hidden" name="_method" value="PUT">
        <input type="hidden" name="token" value="{{ $token }}">

        <label for="email">Email:</label>
        <input type="email" name="email" id="email" value="{{$email}}" required>

        <label for="password">New Password:</label>
        <input type="password" name="password" id="password" required>

        <label for="password_confirmation">Confirm New Password:</label>
        <input type="password" name="password_confirmation" id="password_confirmation" required>

        <button type="submit">Reset Password</button>
    </form> --}}
</body>

</html>

