import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeScoreComponent} from './change-score.component';
import {PlayerService} from '../../../core/services/player.service';
import {PlayerServiceStub} from '../../../core/mocks/player.service.stub';
import {AngularDelegate, ModalController} from '@ionic/angular';
import {mockPlayers} from '../../../shared/model/Player';

describe('ChangeScoreComponent', () => {
    let component: ChangeScoreComponent;
    let fixture: ComponentFixture<ChangeScoreComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChangeScoreComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: PlayerService,
                    useClass: PlayerServiceStub
                },
                ModalController,
                AngularDelegate
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeScoreComponent);
        component = fixture.componentInstance;
        component.player = mockPlayers[0];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
