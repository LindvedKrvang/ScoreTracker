import {TestBed} from '@angular/core/testing';

import {GameService, KEY_SELECTED_GAME} from './game.service';
import {Storage} from '@ionic/storage';
import {StorageMock} from '../mocks/storage.mock';
import {ScoreBoard, Whist} from '../model/Game';
import {of} from 'rxjs';

describe('GameService', () => {
    let service: GameService;
    let storage: Storage;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Storage,
                    useClass: StorageMock
                },
                GameService
            ]
        });
        service = TestBed.get(GameService);
        storage = TestBed.get(Storage);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('saveGame', () => {
        it('should save the selected game as Scoreboard', () => {
            const spy = spyOn(storage, 'set');
            service.saveSelectedGame(ScoreBoard);

            expect(spy).toHaveBeenCalledWith(KEY_SELECTED_GAME, ScoreBoard.gameType);
        });

        it('should save the selected game as Whist', () => {
            const spy = spyOn(storage, 'set');
            service.saveSelectedGame(Whist);

            expect(spy).toHaveBeenCalledWith(KEY_SELECTED_GAME, Whist.gameType);
        });
    });

    describe('loadGame', () =>  {
        it('should load Whist', () => {
            const spy = spyOn(storage, 'get').and.returnValue(of(Whist.gameType).toPromise());
            service.loadSavedGame().then(result => {
                expect(result).toBe(Whist);
                expect(spy).toHaveBeenCalledWith(KEY_SELECTED_GAME);
            });
        });

        it('should load Scoreboard', () => {
            const spy = spyOn(storage, 'get').and.returnValue(of(ScoreBoard.gameType).toPromise());
            service.loadSavedGame().then(result => {
                expect(result).toBe(ScoreBoard);
                expect(spy).toHaveBeenCalledWith(KEY_SELECTED_GAME);
            });
        });

        it('should return null when no game is found', () => {
            const spy = spyOn(storage, 'get').and.returnValue(of(null).toPromise());
            service.loadSavedGame().then(result => {
                expect(result).toBeNull();
                expect(spy).toHaveBeenCalledWith(KEY_SELECTED_GAME);
            });
        });
    });
});
