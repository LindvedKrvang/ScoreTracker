import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WhistOverviewContainerComponent} from './whist-overview-container.component';
import {PlayerService} from '../../../shared/services/player.service';
import {PlayerServiceMock} from '../../../shared/mocks/player.service.mock';
import {NavController} from '@ionic/angular';
import createSpy = jasmine.createSpy;

describe('WhistOverviewContainerComponent', () => {
    let component: WhistOverviewContainerComponent;
    let fixture: ComponentFixture<WhistOverviewContainerComponent>;

    const mockNavController = {
        back: createSpy('back')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WhistOverviewContainerComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: PlayerService,
                    useClass: PlayerServiceMock
                },
                {
                    provide: NavController,
                    useValue: mockNavController
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WhistOverviewContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
