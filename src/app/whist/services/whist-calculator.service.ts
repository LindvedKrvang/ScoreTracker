import {Injectable} from '@angular/core';
import {Call, CallType} from '../model/Call';
import {Player} from '../../shared/model/Player';
import {TRICK_TABLE_SUN, TRICK_TABLES} from '../model/TrickTable';
import {ScoreService} from '../../shared/services/score.service';
import {rules} from '@typescript-eslint/eslint-plugin';

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
        if (calculateInformation.call.majorType === CallType.REGULAR) {
            this.calculateRegularScore(calculateInformation, players);
        } else {
            this.calculateSunScore(calculateInformation, players);
        }
    }

    private calculateRegularScore(calculateInformation: CalculateWhistInformation, players: Player[]): void {
        const trickTable: Map<CallType, Map<number, number>> | undefined = TRICK_TABLES.get(+calculateInformation.targetSticks);
        if (!trickTable) {
            return;
        }
        const trickTableElement: Map<number, number> | undefined = trickTable.get(calculateInformation.call.callType);
        if (!trickTableElement) {
            return;
        }
        const difference = calculateInformation.acquiredSticks - calculateInformation.targetSticks;
        const pointsToBeGiven = trickTableElement.get(difference);
        if (!pointsToBeGiven) {
            return
        }
        const isSelfPartner = calculateInformation.partner.id === -1;
        if (isSelfPartner) {
            this.scoreService.addScore(calculateInformation.caller, pointsToBeGiven * 3);
            const opposition = players.filter(player => player.id !== calculateInformation.caller.id);
            opposition.forEach(opponent => this.scoreService.addScore(opponent, pointsToBeGiven * -1));
        } else {
            const opposition = players.filter(player =>
                player.id !== calculateInformation.caller.id
                && player.id !== calculateInformation.partner.id
            );
            this.scoreService.addScore(calculateInformation.caller, pointsToBeGiven);
            this.scoreService.addScore(calculateInformation.partner, pointsToBeGiven);
            this.scoreService.addScore(opposition[0], pointsToBeGiven * -1);
            this.scoreService.addScore(opposition[1], pointsToBeGiven * -1);
        }
    }

    private calculateSunScore(calculateInformation: CalculateWhistInformation, players: Player[]): void {
        const pointsToBeGiven = TRICK_TABLE_SUN.get(calculateInformation.call.callType);
        if (!pointsToBeGiven) {
            return
        }
        const invertPoints: number = calculateInformation.sunWinningCondition ? 1 : -1;
        this.scoreService.addScore(calculateInformation.caller, pointsToBeGiven * invertPoints);
        const opposition = players.filter(player => player.id !== calculateInformation.caller.id);
        opposition.forEach(opponent => this.scoreService.addScore(opponent, (pointsToBeGiven / 3) * (-1 * invertPoints)));
    }
}
