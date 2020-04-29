import {mockPlayers, Player} from '../../shared/model/Player';
import {of} from 'rxjs';

export class PlayerServiceStub {

    public createPlayer(): Player {
        return mockPlayers[0];
    }

    public updateAllPlayers(): void {}

    public getAllPlayers(): Promise<Player[]> {
        return of(mockPlayers).toPromise();
    }

    public newGame(): void {}

    public doesSavedGameExist(): Promise<boolean> {
        return of(true).toPromise();
    }

    private updateIdInDb(): void {}
}
