import {TestBed} from '@angular/core/testing';
import {GameResolver} from './game.resolver';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {RouterStateSnapshotMock} from '../mocks/router-state-snapshot.mock';
import {ActivatedRouteMock} from '../mocks/activated-route.mock';
import {Game, ScoreBoard, Whist} from '../../shared/model/Game';

describe('GameResolver', () => {

    let testee: GameResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ActivatedRouteSnapshot,
                    useClass: ActivatedRouteMock
                },
                {
                    provide: RouterStateSnapshot,
                    useClass: RouterStateSnapshotMock
                },
                GameResolver
            ]
        });
        testee = TestBed.get(GameResolver);
    });

    it('should create', () => {
        expect(testee).toBeTruthy();
    });

    it('should return ScoreBoard when gameName is ScoreBoard', () => {
        const activatedRouteSnapshot: ActivatedRouteSnapshot = TestBed.get(ActivatedRouteSnapshot);
        const routerStateSnapshot: RouterStateSnapshot = TestBed.get(RouterStateSnapshot);

        const result: Game = testee.resolve(activatedRouteSnapshot, routerStateSnapshot);
        expect(result).toBe(ScoreBoard);
    });

    it('should return Whist when gameName is Whist', () => {
        const activatedRouteSnapshot: ActivatedRouteSnapshot = TestBed.get(ActivatedRouteSnapshot);
        const routerStateSnapshot: RouterStateSnapshot = TestBed.get(RouterStateSnapshot);
        spyOn(activatedRouteSnapshot.paramMap, 'get').and.returnValue(Whist.name);

        const result: Game = testee.resolve(activatedRouteSnapshot, routerStateSnapshot);
        expect(result).toBe(Whist);
    });

});
