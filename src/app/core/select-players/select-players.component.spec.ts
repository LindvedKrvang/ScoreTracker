import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectPlayersComponent} from './select-players.component';
import {AngularDelegate, ModalController} from '@ionic/angular';
import {PlayerService} from '../services/player.service';
import {PlayerServiceStub} from '../mocks/player.service.stub';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../mocks/activated.route.stub';

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
                    useClass: PlayerServiceStub
                },
                ModalController,
                AngularDelegate,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteStub
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
