import {ActivatedRouteSnapshot} from '@angular/router/src/router_state';
import {ScoreBoard} from '../../shared/model/Game';
import {convertToParamMap, Data, ParamMap} from '@angular/router';

export class ActivatedRouteMock {

    public snapshot: ActivatedRouteSnapshot = {
        data: {
            game: ScoreBoard
        } as Data
    } as ActivatedRouteSnapshot;

    public paramMap: ParamMap = convertToParamMap({
        gameName: ScoreBoard.name
    });
}
