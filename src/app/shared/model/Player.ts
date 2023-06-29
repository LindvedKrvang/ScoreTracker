export interface Player {
    id: number;
    name: string;
    score: number;
    gameMetaData?: any;
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
