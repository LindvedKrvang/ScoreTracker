import {Player} from '../../shared/model/Player';

export interface MollkyPlayerMetaData {
  hasWon: boolean
  isEliminated: boolean
  amountOfMisses: number
  isCurrentPlayer: boolean
}

export interface MollkyPlayer extends Player {
  gameMetaData: MollkyPlayerMetaData;
}
