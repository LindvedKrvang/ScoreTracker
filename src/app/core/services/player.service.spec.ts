import {TestBed} from '@angular/core/testing';

import {PlayerService} from './player.service';
import {PlayerServiceStub} from './player.service.stub';

describe('StorageService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: PlayerService,
                useClass: PlayerServiceStub
            }
        ]
    }));

    it('should be created', () => {
        const service: PlayerService = TestBed.get(PlayerService);
        expect(service).toBeTruthy();
    });
});
