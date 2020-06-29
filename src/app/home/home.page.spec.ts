import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePage} from './home.page';
import {PlayerService} from '../shared/services/player.service';
import {PlayerServiceMock} from '../shared/mocks/player.service.mock';
import {GameService} from '../shared/services/game.service';
import {Whist} from '../shared/model/Game';
import {GameServiceMock} from '../shared/mocks/game.service.mock';
import createSpy = jasmine.createSpy;

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    const mockGameService = {
        loadSavedGame: createSpy('loadSavedGame')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: PlayerService,
                    useClass: PlayerServiceMock
                },
                {
                    provide: GameService,
                    useClass: GameServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('load saved game', () => {
       it('should load Whist', async () => {
           await fixture.detectChanges();
           expect(component.loadedGame).toBe(Whist);
       });
    });
});
