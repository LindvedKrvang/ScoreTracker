import {Component, OnInit} from '@angular/core';
import {Game, GAMES} from '../../shared/model/Game';
import {GameService} from '../../shared/services/game.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-select-game',
    templateUrl: './select-game.component.html',
    styleUrls: ['./select-game.component.scss'],
})
export class SelectGameComponent implements OnInit {

    public games: Game[] = GAMES;

    constructor(private gameService: GameService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    public selectGame(game: Game): void {
        this.gameService.saveSelectedGame(game);
        this.router.navigate(['core', 'games', game.gameType, 'players']);
    }

}
