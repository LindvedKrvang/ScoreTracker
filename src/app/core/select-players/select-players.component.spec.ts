import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectPlayersComponent} from './select-players.component';
import {AngularDelegate, ModalController} from '@ionic/angular';
import {PlayerService} from '../services/player.service';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteMock} from '../mocks/activated-route.mock';
import {PlayerServiceMock} from '../mocks/player.service.mock';

describe('SelectPlayersComponent', () => {
    let component: SelectPlayersComponent;
    let fixture: ComponentFixture<SelectPlayersComponent>;

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
});
