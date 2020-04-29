import {Component, OnInit} from '@angular/core';
import {Game, GameType, ScoreBoard, Whist} from '../../shared/model/Game';


@Component({
    selector: 'app-select-game',
    templateUrl: './select-game.component.html',
    styleUrls: ['./select-game.component.scss'],
})
export class SelectGameComponent implements OnInit {

    public gameOptions: GameOption[] = [
        {
            game: ScoreBoard,
            route: `/core/games/${ScoreBoard.name}/players`
        },
        {
            game: Whist,
            route: `/core/games/${Whist.name}/players`
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}

interface GameOption {
    route: string;
    game: Game;
}
