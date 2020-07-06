import {mockPlayers, Player} from '../model/Player';
import {of} from 'rxjs';
import {GameRound} from '../model/GameRound';

export class PlayerServiceMock {

    public createPlayer(): Player {
        return mockPlayers[0];
    }

    public updateAllPlayers(): void {
    }

    public getAllPlayers(): Promise<Player[]> {
        return of(mockPlayers).toPromise();
    }

    public newGame(): void {
    }

    public doesSavedGameExist(): Promise<boolean> {
        return of(true).toPromise();
    }

    private updateIdInDb(): void {
    }

    public addGameRound(): void {
    }

    public async undoLastRound(): Promise<void> {
    }

    public async addInitialUndoStep(): Promise<void> {
    }

    public ableToUndo(): Promise<boolean> {
        return of(true).toPromise();
    }
}

