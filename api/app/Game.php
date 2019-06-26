<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    //
    protected $casts = [
        'rules' => 'array',
    ];

    function rounds()
    {
        return $this->hasMany('\App\Round', 'game_id');
    }
}
