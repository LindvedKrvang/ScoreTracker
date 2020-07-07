import {Injectable} from '@angular/core';
import {Player} from '../model/Player';
import {Storage} from '@ionic/storage';
import {GameRound} from '../model/GameRound';

const KEY_PLAYERS = 'KEY_PLAYERS';
const KEY_ID_COUNTER = 'KEY_ID_COUNTER';
const KEY_GAME_ROUNDS = 'KEY_GAME_ROUNDS';

@Injectable()
export class PlayerService {

    private idCounter: number = 0;

    constructor(private storage: Storage) {
        this.storage.get(KEY_ID_COUNTER).then(id => id ? this.idCounter = id : this.idCounter = 0);
    }

    public createPlayer(name: string): Player {
        const player: Player = {
            id: ++this.idCounter,
            name,
            score: 0
        };
        this.updateIdInDb();
        return player;
    }

    public updateAllPlayers(players: Player[]): void {
        this.storage.set(KEY_PLAYERS, players);
    }

    public getAllPlayers(): Promise<Player[]> {
        return this.storage.get(KEY_PLAYERS).then();
    }

    public newGame(): void {
        this.storage.clear();
        this.updateAllPlayers([]);
        this.clearUndoHistory();
    }

    public doesSavedGameExist(): Promise<boolean> {
        return this.storage.get(KEY_PLAYERS).then(value => {
            return value != null;
        });
    }

    private updateIdInDb(): void {
        this.storage.set(KEY_ID_COUNTER, this.idCounter);
    }

    public addGameRound(gameRound: GameRound): void {
        this.storage.get(KEY_GAME_ROUNDS).then((gameRounds: GameRound[]) => {
           if (!!gameRounds) {
               gameRounds.push(gameRound);
           } else {
               gameRounds = [gameRound];
           }
           this.storage.set(KEY_GAME_ROUNDS, gameRounds);
        });
    }

    public async undoLastRound(): Promise<void> {
        await this.storage.get(KEY_GAME_ROUNDS).then((gameRounds: GameRound[]) => {
            if (!!gameRounds && gameRounds.length > 1) {
                gameRounds.pop();
                this.storage.set(KEY_GAME_ROUNDS, gameRounds);
                this.storage.set(KEY_PLAYERS, gameRounds[gameRounds.length - 1].players);
            }
        });
    }

    public async addInitialUndoStep(gameRound: GameRound): Promise<void> {
        await this.storage.get(KEY_GAME_ROUNDS).then((gameRounds: GameRound[]) => {
            if (!!gameRounds && gameRounds.length > 0) {
                return;
            }
            this.storage.set(KEY_GAME_ROUNDS, [gameRound]);
        });
    }

    private clearUndoHistory(): void {
        this.storage.set(KEY_GAME_ROUNDS, []);
    }

    public ableToUndo(): Promise<boolean> {
        return this.storage.get(KEY_GAME_ROUNDS).then((gameRounds: GameRound[]) => {
           return gameRounds.length > 1;
        });
    }
}
