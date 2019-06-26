<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Round extends Model
{
    //
    protected $fillable = ['move_player_1', 'move_player_2', 'winner', 'game_id'];
}
