import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectGameComponent} from './select-game.component';
import {GameService} from '../../shared/services/game.service';
import {GameServiceMock} from '../../shared/mocks/game.service.mock';
import {ScoreBoard, Whist} from '../../shared/model/Game';
import createSpy = jasmine.createSpy;
import {Router} from '@angular/router';

describe('SelectGameComponent', () => {
    let component: SelectGameComponent;
    let fixture: ComponentFixture<SelectGameComponent>;

    const mockRouter = {
        navigate: createSpy('navigate')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectGameComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: GameService,
                    useClass: GameServiceMock
                },
                {
                    provide: Router,
                    useValue: mockRouter
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('selectGame', () => {
        it('should save Whist', () => {
            const gameService = TestBed.get(GameService);
            const spy = spyOn(gameService, 'saveSelectedGame');
            component.selectGame(Whist);

            expect(spy).toHaveBeenCalledWith(Whist);
        });

        it('should save Scoreboard', () => {
            const gameService = TestBed.get(GameService);
            const spy = spyOn(gameService, 'saveSelectedGame');
            component.selectGame(ScoreBoard);

            expect(spy).toHaveBeenCalledWith(ScoreBoard);
        });

        it('should change the route to Whist', () => {
            component.selectGame(Whist);

            expect(mockRouter.navigate).toHaveBeenCalledWith(['core', 'games', Whist.gameType, 'players']);
        });

        it('should change the route to Scoreboard', () => {
            component.selectGame(ScoreBoard);

            expect(mockRouter.navigate).toHaveBeenCalledWith(['core', 'games', ScoreBoard.gameType, 'players']);
        });
    });
});
