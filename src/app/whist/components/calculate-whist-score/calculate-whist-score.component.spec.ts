import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CalculateWhistScoreComponent} from './calculate-whist-score.component';
import {FormBuilder, Validators} from '@angular/forms';
import {PlayerService} from '../../../shared/services/player.service';
import {PlayerServiceMock} from '../../../shared/mocks/player.service.mock';
import {Regular, Sun} from '../../model/Call';
import {mockPlayers} from '../../../shared/model/Player';
import {WhistCalculatorService} from '../../services/whist-calculator.service';
import {WhistCalculatorMockService} from '../../mocks/whist-calculator.mock.service';
import createSpy = jasmine.createSpy;
import {NavController} from '@ionic/angular';

describe('CalculateWhistScoreComponent', () => {
    let component: CalculateWhistScoreComponent;
    let fixture: ComponentFixture<CalculateWhistScoreComponent>;

    const mockNavController = {
        back: createSpy('back')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalculateWhistScoreComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                FormBuilder,
                {
                    provide: PlayerService,
                    useClass: PlayerServiceMock
                },
                {
                    provide: WhistCalculatorService,
                    useClass: WhistCalculatorMockService
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
        fixture = TestBed.createComponent(CalculateWhistScoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update validators correctly when majorType is REGULAR', () => {
        component.form.get('call').setValue(Regular);
        fixture.detectChanges();

        expect(component.form.get('partner').validator).toBe(Validators.required);
        expect(component.form.get('targetSticks').validator).toBe(Validators.required);
        expect(component.form.get('acquiredSticks').validator).toBe(Validators.required);
        expect(component.form.get('sunWinningCondition').validator).toBe(null);
    });

    it('should update validators correctly when majorType is SUN', () => {
        component.form.get('call').setValue(Sun);
        fixture.detectChanges();

        expect(component.form.get('partner').validator).toBe(null);
        expect(component.form.get('targetSticks').validator).toBe(null);
        expect(component.form.get('acquiredSticks').validator).toBe(null);
        expect(component.form.get('sunWinningCondition').validator).toBe(Validators.required);
    });

    describe('partner', () => {
       it('should not contain selected player', () => {
           component.players = mockPlayers;
           component.remainingPlayers = mockPlayers;
           component.form.get('caller').setValue(mockPlayers[0]);
           fixture.detectChanges();

           expect(component.remainingPlayers.includes(mockPlayers[0])).toBeFalsy();
       }) ;

       it('should include a "NO_Partner" player', () => {
           component.form.get('caller').setValue(mockPlayers[0]);
           fixture.detectChanges();

           expect(component.remainingPlayers.find(value => value.name === 'No partner')).toBeTruthy();
       });

       it('should be set to null if the selectedPlayer is the same as partner', () => {
           component.players = mockPlayers;
           component.form.get('partner').setValue(mockPlayers[0]);
           component.form.get('caller').setValue(mockPlayers[0]);
           fixture.detectChanges();

           expect(component.form.get('partner').value).toBeNull();
       });
    });
});
