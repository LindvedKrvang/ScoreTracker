import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OverviewComponent} from './overview.component';
import {PlayerService} from '../../../shared/services/player.service';
import {AngularDelegate, ModalController} from '@ionic/angular';
import {RouterTestingModule} from '@angular/router/testing';
import {PlayerServiceMock} from '../../../shared/mocks/player.service.mock';
import {ScoreService} from '../../services/score.service';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let fixture: ComponentFixture<OverviewComponent>;

    const mockScoreService = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [OverviewComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: PlayerService,
                    useClass: PlayerServiceMock
                },
                {
                    provide: ScoreService,
                    useValue: mockScoreService
                },
                ModalController,
                AngularDelegate
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
