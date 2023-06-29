export interface Game {
    name: string;
    gameType: GameType;
    requiredPlayers?: number;
}

export enum GameType {
    NO_GAME = 'NO_GAME',
    SCORE_BOARD= 'SCORE_BOARD',
    WHIST = 'WHIST',
    MOLlKY = 'MOLlKY'
}

export const NoGame: Game = {
  name: '',
  gameType: GameType.NO_GAME
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

export const Mollky: Game = {
  name: 'Möllky',
  gameType: GameType.MOLlKY
}

export const GAMES: Game[] = [
    ScoreBoard,
    Whist,
    Mollky
];
