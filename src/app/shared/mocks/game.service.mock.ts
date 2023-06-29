import {Game, Whist} from '../model/Game';
import {firstValueFrom, of} from 'rxjs';

export class GameServiceMock {

    public saveSelectedGame(selectedGame: Game): void {}

    public loadSavedGame(): Promise<Game> {
      return firstValueFrom(of(Whist));
    }
}
