import {TestBed} from '@angular/core/testing';

import {PlayerService} from './player.service';
import {Storage} from '@ionic/storage';
import {mockPlayers, Player} from '../../shared/model/Player';
import {of} from 'rxjs';
import {StorageMock} from '../mocks/storage.mock';

describe('PlayerService', () => {
    let service: PlayerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Storage,
                    useClass: StorageMock
                },
                PlayerService
            ]
        });
        service = TestBed.get(PlayerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createPlayer', () => {
        it('should create players with incremented ids', () => {
            const playerOne: Player = service.createPlayer('PlayerOne');
            const playerTwo: Player = service.createPlayer('PlayerTwo');
            expect(playerOne.id).not.toBe(playerTwo.id);
            expect(playerTwo.id).toBe(playerOne.id + 1);
        });

        it('should create player with the parsed name', () => {
            const playerName = 'PlayerName';
            const player = service.createPlayer(playerName);
            expect(player.name).toBe(playerName);
        });

        it('should create players with a score of zero', () => {
            const playerName = 'PlayerName';
            const player = service.createPlayer(playerName);
            expect(player.score).toBe(0);
        });

        it ('should update IdCounter in database', () => {
            const storage = TestBed.get(Storage);
            const spy = spyOn(storage, 'set');
            service.createPlayer('PlayerName');

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('updateAllPlayers', () => {
        it('should call storage with parsed players', () => {
            const storage = TestBed.get(Storage);
            const spy = spyOn(storage, 'set');
            service.updateAllPlayers(mockPlayers);

            expect(spy).toHaveBeenCalledWith('KEY_PLAYERS', mockPlayers);
        });
    });

    describe('getAllPlayers', () => {
        it('should retrieve all players from database', () => {
            const storage = TestBed.get(Storage);
            spyOn(storage, 'get').and.returnValue(of(mockPlayers).toPromise());
            service.getAllPlayers().then(players => {
                expect(players).toBe(mockPlayers);
            });
        });
    });

    describe('newGame', () => {
       it('should clear the database', () => {
           const storage = TestBed.get(Storage);
           const spy = spyOn(storage, 'clear');
           service.newGame();
           expect(spy).toHaveBeenCalled();
       });

       it('should update all players with empty array', () => {
          const spy = spyOn(service, 'updateAllPlayers');
          service.newGame();
          expect(spy).toHaveBeenCalled();
       });
    });

    describe('doesSavedGameExist', () => {
       it('should return false when no players exist', () => {
           const storage = TestBed.get(Storage);
           spyOn(storage, 'get').and.returnValue(of(null).toPromise());
           service.doesSavedGameExist().then(result => expect(result).toBeFalsy());
       });

       it('should return true when players exist', () => {
           const storage = TestBed.get(Storage);
           spyOn(storage, 'get').and.returnValue(of(mockPlayers).toPromise());
           service.doesSavedGameExist().then(result => expect(result).toBeTruthy());
       });
    });
});
