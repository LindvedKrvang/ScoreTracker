import {Component, OnInit} from '@angular/core';
import {Game, Whist} from '../../../shared/model/Game';
import {Player} from '../../../shared/model/Player';
import {PlayerService} from '../../../shared/services/player.service';

@Component({
    selector: 'app-whist-overview-container',
    templateUrl: './whist-overview-container.component.html',
    styleUrls: ['./whist-overview-container.component.scss'],
})
export class WhistOverviewContainerComponent implements OnInit {

    public game: Game = Whist;
    public players: Player[] = [];

    constructor(private playerService: PlayerService) {
    }

    public ngOnInit(): void {
        this.playerService.getAllPlayers().then(players => this.players = players);
    }
}
