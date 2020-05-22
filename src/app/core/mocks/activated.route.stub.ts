import {ActivatedRouteSnapshot} from '@angular/router/src/router_state';
import {ScoreBoard} from '../../shared/model/Game';
import {Data} from '@angular/router';

export class ActivatedRouteStub {

    public snapshot: ActivatedRouteSnapshot = {
        data: {
            game: ScoreBoard
        } as Data
    } as ActivatedRouteSnapshot;
}
