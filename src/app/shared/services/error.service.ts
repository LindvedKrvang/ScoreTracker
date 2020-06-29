import {Injectable} from '@angular/core';
import {Player} from '../model/Player';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor() {
    }

    public static throwIllegalArgumentException(message?: string): void {
        throw new Error(`IllegalArgumentException: ${message}`);
    }

    public static validatePlayer(player: Player): void {
        if (player === null) {
            this.throwIllegalArgumentException('Player must not be null');
        }
    }
}
