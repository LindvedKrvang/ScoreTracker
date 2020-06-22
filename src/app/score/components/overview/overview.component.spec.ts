import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OverviewComponent} from './overview.component';
import {PlayerService} from '../../../core/services/player.service';
import {AngularDelegate, ModalController} from '@ionic/angular';
import {RouterTestingModule} from '@angular/router/testing';
import {PlayerServiceMock} from '../../../core/mocks/player.service.mock';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let fixture: ComponentFixture<OverviewComponent>;

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
                ModalController,
                AngularDelegate
            ]
        })
            .compileComponents();
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
