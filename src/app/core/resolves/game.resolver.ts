import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Game, ScoreBoard, Whist} from '../../shared/model/Game';

export class GameResolver implements Resolve<Game> {

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Game {
        const gameType: string = route.paramMap.get('gameType');
        switch (gameType) {
            case ScoreBoard.gameType:
                return ScoreBoard;
            case Whist.gameType:
                return Whist;
        }
    }
}
