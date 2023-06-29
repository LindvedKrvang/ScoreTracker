import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Game, Mollky, NoGame, ScoreBoard, Whist} from '../model/Game';

export const GameResolver: ResolveFn<Game> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Game => {
  const gameType: string | null = route.paramMap.get('gameType');
  switch (gameType) {
    case ScoreBoard.gameType:
      return ScoreBoard;
    case Whist.gameType:
      return Whist;
    case Mollky.gameType:
      return Mollky
    default:
      return NoGame
  }
}
