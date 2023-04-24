<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ResponseHelper
{
    public static function generateResponse(Request $request, string $status, string $message, $data, int $statusCode) : JsonResponse
    {
        if ($request->expectsJson()) {
            return response()->json([
                'status' => $status,
                'message' => $message,
                'data' => $data,
            ], $statusCode);
        } else {
            
        }
    }


    // public static function generateResponse(Request $request, string $status, string $message, $data, int $statusCode) : JsonResponse
    // {
    //     if ($data) {
    //         return response()->json([
    //             'status' => $status,
    //             'message' => $message,
    //             'data' => $data,
    //             'data' => $statusCode,
    //         ], $statusCode);
    //     } else {
    //         // generate HTML response
    //         // ...
    //     }
    // }
}
?>
