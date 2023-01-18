<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;


use Illuminate\Http\Request;

class CompletionController extends Controller
{
    //

    public function traduction(Request $request)
    {
            https://api.openai.com/v1/completions
            $url=env('API_BASE_ROUTE')."/completions";
            $token=env("TOKEN");
            $data=[
                "model"=> "text-davinci-003",
                "prompt"=>$request->input('prompt'),
                "stream"=> false,
                "temperature"=>0.3,
                "max_tokens"=>100,
                "top_p"=>1.0,
                "frequency_penalty"=>0.0,
                "presence_penalty"=>0.0
            ];
            $response = Http::withHeaders([
                'Content-Typet' => 'application/json',
                'Authorization' => 'Bearer '.$token
            ])->post($url,$data);

            return $response->json();//response($response->json());
    }

    public function correction(Request $request)
    {
        //prompt="Correct this to standard English:\n\nShe no went to the market.",

        //https://api.openai.com/v1/edits
        $url=env('API_BASE_ROUTE')."/edits";
        $token=env("TOKEN");
        $data=[
            "model"=>"text-davinci-edit-001",
            "input"=>$request->input('input'),
            "instruction"=>"Fix the spelling mistakes",
            "temperature"=> 0,
            "top_p"=> 1,
        ];


        $response = Http::withHeaders([
            'Content-Typet' => 'application/json',
            'Authorization' => 'Bearer '.$token
        ])->post($url,$data);

        return $response->json();
    }

}
