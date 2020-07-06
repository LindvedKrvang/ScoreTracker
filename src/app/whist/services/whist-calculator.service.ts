import {Injectable} from '@angular/core';
import {Call, CallType} from '../model/Call';
import {Player} from '../../shared/model/Player';
import {TRICK_TABLES} from '../model/TrickTable';
import {ScoreService} from '../../shared/services/score.service';

export interface CalculateWhistInformation {
    call: Call;
    caller: Player;
    partner: Player;
    targetSticks: number;
    acquiredSticks: number;
    sunWinningCondition: boolean;
}

@Injectable()
export class WhistCalculatorService {

    constructor(private scoreService: ScoreService) {
    }

    public calculateScore(calculateInformation: CalculateWhistInformation, players: Player[]): void {
        const trickTable: Map<CallType, Map<number, number>> = TRICK_TABLES.get(+calculateInformation.targetSticks);
        const trickTableElement: Map<number, number> = trickTable.get(calculateInformation.call.callType);
        const difference = calculateInformation.acquiredSticks - calculateInformation.targetSticks;
        const pointToBeGiven = trickTableElement.get(difference);
        const isSelfPartner = calculateInformation.partner.id === -1;
        if (isSelfPartner) {

        } else {
            const opposition = players.filter(player =>
                player.id !== calculateInformation.caller.id
                && player.id !== calculateInformation.partner.id
            );
            this.scoreService.addScore(calculateInformation.caller, pointToBeGiven);
            this.scoreService.addScore(calculateInformation.partner, pointToBeGiven);
            this.scoreService.addScore(opposition[0], pointToBeGiven * -1);
            this.scoreService.addScore(opposition[1], pointToBeGiven * -1);
        }
    }
}
