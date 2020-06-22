export interface Game {
    name: string;
    gameType: GameType;
    requiredPlayers?: number;
}

export enum GameType {
    SCORE_BOARD= 'SCORE_BOARD',
    WHIST = 'WHIST'
}

export const ScoreBoard: Game = {
    name: 'Score Board',
    gameType: GameType.SCORE_BOARD
};

export const Whist: Game = {
    name: 'Whist',
    gameType: GameType.WHIST,
    requiredPlayers: 4
};
