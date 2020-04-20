import {TestBed} from '@angular/core/testing';

import {ScoreService} from './score.service';
import {Player} from '../../core/model/Player';

describe('ScoreService', () => {

    let service: ScoreService;
    const amount: number  = 50;
    let player: Player;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(ScoreService);
        player = {
            name: 'Bob',
            score: 10
        } as Player;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('addScore() should call validatePlayer', () => {
        expect(() => service.addScore(null, amount)).toThrow(new Error('IllegalArgumentException: Player must not be null'));
    });

    it('addScore() should add the score with the parsed amount', () => {
        const beforeAmount = player.score;
        service.addScore(player, amount);

        expect(player.score).not.toBe(beforeAmount);
        expect(player.score).toBe(beforeAmount + amount);
    });

    it('subtractScore() should throw IllegalArgumentException since Player is null', () => {
        expect(() => service.subtractScore(null, amount)).toThrow(new Error('IllegalArgumentException: Player must not be null'));
    });

    it('subtractScore() should substract the score with the parsed amount', () => {
        const beforeAmount = player.score;
        service.subtractScore(player, amount);

        expect(player.score).not.toBe(beforeAmount);
        expect(player.score).toBe(beforeAmount - amount);
    });

    it('resetScore() should throw IllegalArgumentException since Player is null', () => {
        expect(() => service.resetScore(null)).toThrow(new Error('IllegalArgumentException: Player must not be null'));
    });

    it('resetScore() should set the score of the player to 0 - the score is greater than 0', () => {
       expect(player.score).toBeGreaterThan(0);
       service.resetScore(player);
       expect(player.score).toBe(0);
    });

    it('resetScore() should set the score to 0 - the score is less than 0', () => {
        player.score = -50;
        expect(player.score).toBeLessThan(0);
        service.resetScore(player);
        expect(player.score).toBe(0);
    });

    it('setScore() should throw IllegalArgumentException since Player is null', () => {
        expect(() => service.setScore(null, amount)).toThrow(new Error('IllegalArgumentException: Player must not be null'));
    });

    it('setScore() should set the score to the parsed value', () => {
       const beforeAmount = player.score = 40;
       service.setScore(player, amount);

       expect(player.score).not.toBe(beforeAmount);
       expect(player.score).toBe(amount);
    });
});
