import {PlayerService} from '../shared/services/player.service';
import {GameService} from '../shared/services/game.service';
import {Game, GameType} from '../shared/model/Game';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public loadedGame?: Game;

    constructor(private playerService: PlayerService,
                private gameService: GameService) {
    }

    ngOnInit(): void {
        this.gameService.loadSavedGame().then((loadedGame: Game) => this.loadedGame = loadedGame);
    }

    newGame(): void {
        this.playerService.newGame();
    }
}
