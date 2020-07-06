import {TestBed} from '@angular/core/testing';

import {WhistCalculatorService} from './whist-calculator.service';
import {ScoreService} from '../../shared/services/score.service';
import createSpy = jasmine.createSpy;

describe('WhistCalculatorService', () => {

    const mockScoreService = {
        addScore: createSpy('addScore')
    };

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            WhistCalculatorService,
            {
                provide: ScoreService,
                useValue: mockScoreService
            }
        ]
    }));

    it('should be created', () => {
        const service: WhistCalculatorService = TestBed.get(WhistCalculatorService);
        expect(service).toBeTruthy();
    });
});
