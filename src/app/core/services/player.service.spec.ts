import {TestBed} from '@angular/core/testing';

import {PlayerService} from './player.service';
import {Storage} from '@ionic/storage';
import {StorageStub} from '../mocks/storage.stub';

describe('PlayerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: Storage,
                useClass: StorageStub
            },
            PlayerService
        ]
    }));

    it('should be created', () => {
        const service: PlayerService = TestBed.get(PlayerService);
        expect(service).toBeTruthy();
    });
});
