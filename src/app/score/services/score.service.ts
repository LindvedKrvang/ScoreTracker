import {Injectable} from '@angular/core';
import {Player} from '../../core/model/Player';
import {ErrorService} from '../../core/services/error.service';

@Injectable({
    providedIn: 'root'
})
export class ScoreService {

    constructor() {
    }

    public addScore(player: Player, amount: number): void {
        ErrorService.validatePlayer(player);
        if (typeof amount !== 'number') {
            amount = +amount;
        }

        player.score += amount;
    }

    public subtractScore(player: Player, amount: number): void {
        ErrorService.validatePlayer(player);
        if (typeof amount !== 'number') {
            amount = +amount;
        }

        player.score -= amount;
    }

    public resetScore(player: Player): void {
        ErrorService.validatePlayer(player);

        player.score = 0;
    }

    public setScore(player: Player, amount: number): void {
        ErrorService.validatePlayer(player);
        if (typeof amount !== 'number') {
            amount = +amount;
        }

        player.score = amount;
    }
}
