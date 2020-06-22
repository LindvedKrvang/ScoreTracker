import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Game, ScoreBoard, Whist} from '../../shared/model/Game';

export class GameResolver implements Resolve<Game> {

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Game {
        const gameName: string = route.paramMap.get('gameName');
        switch (gameName) {
            case ScoreBoard.name:
                return ScoreBoard;
            case Whist.name:
                return Whist;
        }
    }
}
