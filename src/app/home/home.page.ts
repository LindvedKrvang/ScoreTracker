import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../core/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    private savedGameExist: boolean;

    constructor(private playerService: PlayerService) {
    }

    ngOnInit(): void {
        this.playerService.doesSavedGameExist().then(value => {
            this.savedGameExist = value;
        });
    }

    newGame(): void {
        this.playerService.newGame();
    }
}
