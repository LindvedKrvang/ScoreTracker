import {Injectable} from '@angular/core';
import {Player} from '../model/Player';
import {Storage} from '@ionic/storage';

const KEY_PLAYERS = 'KEY_PLAYERS';
const KEY_ID_COUNTER = 'KEY_ID_COUNTER';

@Injectable()
export class PlayerService {

    private idCounter: number;

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
    }

    public doesSavedGameExist(): Promise<boolean> {
        return this.storage.get(KEY_PLAYERS).then(value => {
            return value != null;
        });
    }

    private updateIdInDb(): void {
        this.storage.set(KEY_ID_COUNTER, this.idCounter);
    }
}
