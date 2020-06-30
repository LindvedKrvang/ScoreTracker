import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectPlayersComponent} from './select-players.component';
import {AngularDelegate, ModalController} from '@ionic/angular';
import {PlayerService} from '../../shared/services/player.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {ActivatedRouteMock} from '../../shared/mocks/activated-route.mock';
import {PlayerServiceMock} from '../../shared/mocks/player.service.mock';
import {ScoreBoard, Whist} from '../../shared/model/Game';
import createSpy = jasmine.createSpy;

describe('SelectPlayersComponent', () => {
    let component: SelectPlayersComponent;
    let fixture: ComponentFixture<SelectPlayersComponent>;

    const mockRouter = {
        navigate: createSpy('navigate')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectPlayersComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: PlayerService,
                    useClass: PlayerServiceMock
                },
                ModalController,
                AngularDelegate,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteMock
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
        fixture = TestBed.createComponent(SelectPlayersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('navigateToSelectedGame', () => {
        it('should navigate to Whist', () => {
            component.game = Whist;
            component.navigateToSelectedGame();

            expect(mockRouter.navigate).toHaveBeenCalledWith([Whist.gameType]);
        });

        it('should navigate to Scoreboard', () => {
            component.game = ScoreBoard;
            component.navigateToSelectedGame();

            expect(mockRouter.navigate).toHaveBeenCalledWith([ScoreBoard.gameType]);
        });
    });
});
