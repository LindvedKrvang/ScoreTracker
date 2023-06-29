import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Game, Mollky, NoGame, ScoreBoard, Whist} from '../model/Game';

export const KEY_SELECTED_GAME: string = 'KEY_SELECTED_GAME';

@Injectable()
export class GameService {

    constructor(private storage: Storage) {
    }

    public saveSelectedGame(selectedGame: Game): void {
        this.storage.set(KEY_SELECTED_GAME, selectedGame.gameType);
    }

    public loadSavedGame(): Promise<Game> {
        return this.storage.get(KEY_SELECTED_GAME).then(gameType => {
            switch (gameType) {
                case Whist.gameType:
                    return Whist;
                case ScoreBoard.gameType:
                    return ScoreBoard;
              case Mollky.gameType:
                    return Mollky
                default:
                    return NoGame;
            }
        });
    }

}
