import {Game, Whist} from '../model/Game';
import {of} from 'rxjs';

export class GameServiceMock {

    public saveSelectedGame(selectedGame: Game): void {}

    public loadSavedGame(): Promise<Game> {
        return of(Whist).toPromise();
    }
}
