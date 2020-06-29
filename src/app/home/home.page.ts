import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../shared/services/player.service';
import {GameService} from '../shared/services/game.service';
import {Game} from '../shared/model/Game';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public loadedGame: Game;

    constructor(private playerService: PlayerService,
                private gameService: GameService) {
    }

    ngOnInit(): void {
        this.gameService.loadSavedGame().then(loadedGame => this.loadedGame = loadedGame);
    }

    newGame(): void {
        this.playerService.newGame();
    }
}
