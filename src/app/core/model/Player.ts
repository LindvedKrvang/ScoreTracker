export interface Player {
    id: number;
    name: string;
    score: number;
}

export const mockPlayers: Player[] = [
    {
        id: 123456,
        name: 'randomPlayerName',
        score: 42
    },
    {
        id: 987654,
        name: 'moreRandomPlayerName',
        score: 24
    }
];
