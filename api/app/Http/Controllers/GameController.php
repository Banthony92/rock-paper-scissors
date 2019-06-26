<?php

namespace App\Http\Controllers;

use App\Game;
use App\Round;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $games = Game::with('rounds')->orderBy('created_at', 'desc')->paginate(5);

        return response()->json($games);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $game = new Game();
        $game->player_1 = $request->player_1;
        $game->player_2 = $request->player_2;
        $game->winner = $request->winner;
        $game->rules = $request->rules;
        $game->save();

        foreach ($request->rounds as $data) {
            $data['game_id'] = $game->id;
            Round::create($data);
        }

        return response()->json(['msj' => 'Ok']);
    }
}
