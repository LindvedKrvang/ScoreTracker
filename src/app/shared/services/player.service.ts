import {Injectable} from '@angular/core';
import {Player} from '../model/Player';
import {Storage} from '@ionic/storage';
import {GameRound} from '../model/GameRound';
import {StorageService} from './storage.service';

const KEY_PLAYERS = 'KEY_PLAYERS';
const KEY_ID_COUNTER = 'KEY_ID_COUNTER';
const KEY_GAME_ROUNDS = 'KEY_GAME_ROUNDS';

@Injectable()
export class PlayerService {

    private idCounter: number = 0;

    constructor(private storageService: StorageService) {
        this.storageService.get(KEY_ID_COUNTER)
          .then((id: number) => id ? this.idCounter = id : this.idCounter = 0);
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
        this.storageService.set(KEY_PLAYERS, players);
    }

    public getAllPlayers(): Promise<Player[]> {
        return this.storageService.get(KEY_PLAYERS).then();
    }

    public newGame(): void {
        this.storageService.clear();
        this.updateAllPlayers([]);
        this.clearUndoHistory();
    }

    public doesSavedGameExist(): Promise<boolean> {
        return this.storageService.get(KEY_PLAYERS).then((value: any) => {
            return value != null;
        });
    }

    private updateIdInDb(): void {
        this.storageService.set(KEY_ID_COUNTER, this.idCounter);
    }

    public addGameRound(gameRound: GameRound): void {
        this.storageService.get(KEY_GAME_ROUNDS).then((gameRounds: GameRound[]) => {
           if (!!gameRounds) {
               gameRounds.push(gameRound);
           } else {
               gameRounds = [gameRound];
           }
           this.storageService.set(KEY_GAME_ROUNDS, gameRounds);
        });
    }

    public async undoLastRound(): Promise<void> {
        await this.storageService.get(KEY_GAME_ROUNDS).then((gameRounds: GameRound[]) => {
            if (!!gameRounds && gameRounds.length > 1) {
                gameRounds.pop();
                this.storageService.set(KEY_GAME_ROUNDS, gameRounds);
                this.storageService.set(KEY_PLAYERS, gameRounds[gameRounds.length - 1].players);
            }
        });
    }

    public async addInitialUndoStep(gameRound: GameRound): Promise<void> {
        await this.storageService.get(KEY_GAME_ROUNDS).then((gameRounds: GameRound[]) => {
            if (!!gameRounds && gameRounds.length > 0) {
                return;
            }
            this.storageService.set(KEY_GAME_ROUNDS, [gameRound]);
        });
    }

    private clearUndoHistory(): void {
        this.storageService.set(KEY_GAME_ROUNDS, []);
    }

    public ableToUndo(): Promise<boolean> {
        return this.storageService.get(KEY_GAME_ROUNDS).then((gameRounds: GameRound[]) => {
           return gameRounds.length > 1;
        });
    }
}
