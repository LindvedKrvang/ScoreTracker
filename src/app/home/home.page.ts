import { Component } from '@angular/core';
import {PlayerService} from '../core/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private playerService: PlayerService) {
    }

    newGame(): void {
        this.playerService.newGame();
    }
}
