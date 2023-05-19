<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css'>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" />




    {{-- <link rel="stylesheet" href="./style.css" /> --}}

    <title>Task Management System</title>
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>


    {{-- <script type="text/javascript" src="{{ asset('js/app.js') }}"></script> --}}
    @viteReactRefresh
    @vite('resources/js/app.js')

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/v/dt/dt-1.10.25/datatables.min.js"></script>
    <script>
        // $(document).ready(function() {
        //     $('#myTable').DataTable();
        // });

        $(document).ready(function() {
            // console.log("xyz")
            setTimeout(() => {
                $('#myTable').DataTable();   
            }, 5*1000);
            
        });
    </script>

</body>

</html>
