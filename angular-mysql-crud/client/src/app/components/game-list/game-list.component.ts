import { Component, OnInit } from '@angular/core';

import { GamesService } from '../../services/games.service';
import { Game } from 'src/app/models/Game';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: any = [];

  constructor(private gamesService: GamesService) {  }

  ngOnInit() {      
    this.gamesService.getGames().subscribe(
      res => {
       this.games = res;
      },
      err => console.error(err)
    );
  }

}
