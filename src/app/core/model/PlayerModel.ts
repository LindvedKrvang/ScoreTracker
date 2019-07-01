import {Player} from './Player';

export class PlayerModel {

    private static idCounter: number = 0;

    private static instance: PlayerModel;

    private playerList: Player[] = [];

    public static getInstance(): PlayerModel {
        if (!this.instance) {
            this.instance = new PlayerModel();
        }
        return this.instance;
    }

    private constructor() {

    }

    get players(): Player[] {
        return this.playerList;
    }

    public addPlayer(name: string): void {
        const player: Player = {
            id: ++PlayerModel.idCounter,
            name,
            score: 0
        };
        this.playerList.push(player);
    }

    public removePlayer(player: Player): void {
        const index = this.playerList.indexOf(player);
        if (index < 0) {
            return;
        }
        this.playerList.splice(index, 1);
    }
}
