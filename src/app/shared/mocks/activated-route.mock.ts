import {ScoreBoard} from '../model/Game';
import {ActivatedRouteSnapshot, convertToParamMap, Data, ParamMap} from '@angular/router';

export class ActivatedRouteMock {

    public snapshot: ActivatedRouteSnapshot = {
        data: {
            game: ScoreBoard
        } as Data
    } as ActivatedRouteSnapshot;

    public paramMap: ParamMap = convertToParamMap({
        gameType: ScoreBoard.gameType
    });
}
