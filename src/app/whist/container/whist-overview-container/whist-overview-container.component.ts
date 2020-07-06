import {Component, OnInit} from '@angular/core';
import {Game, Whist} from '../../../shared/model/Game';
import {Player} from '../../../shared/model/Player';
import {PlayerService} from '../../../shared/services/player.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-whist-overview-container',
    templateUrl: './whist-overview-container.component.html',
    styleUrls: ['./whist-overview-container.component.scss'],
})
export class WhistOverviewContainerComponent implements OnInit {

    public game: Game = Whist;
    public players: Player[] = [];
    public sortByScore: boolean = false;

    constructor(private playerService: PlayerService,
                private navController: NavController) {
    }

    public ngOnInit(): void {
    }

    ionViewWillEnter(): void {
        this.playerService.getAllPlayers().then(players => this.players = players);
    }

    goBack(): void {
        this.navController.back();
    }

    toggleSortByScore(): void {
        let sort: (a: Player, b: Player) => number;
        sort = !this.sortByScore ? ((a, b) => b.score - a.score) : ((a, b) => a.id - b.id);
        this.players.sort(sort);
    }
}
