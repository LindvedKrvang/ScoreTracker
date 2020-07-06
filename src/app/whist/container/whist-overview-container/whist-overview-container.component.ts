import {Component, OnInit} from '@angular/core';
import {Game, Whist} from '../../../shared/model/Game';
import {Player} from '../../../shared/model/Player';
import {PlayerService} from '../../../shared/services/player.service';
import {AlertController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-whist-overview-container',
    templateUrl: './whist-overview-container.component.html',
    styleUrls: ['./whist-overview-container.component.scss'],
})
export class WhistOverviewContainerComponent implements OnInit {

    public game: Game = Whist;
    public players: Player[] = [];
    public sortByScore: boolean = false;
    public ableToUndo: boolean = false;

    constructor(private playerService: PlayerService,
                private navController: NavController,
                private alertController: AlertController) {
    }

    public ngOnInit(): void {
    }

    ionViewWillEnter(): void {
        this.fetchPlayers();
    }

    private fetchPlayers(): void {
        this.playerService.getAllPlayers().then(players => {
            this.players = players;
            this.sortPlayers();
            this.updateAbleToUndo();
        });
    }

    private updateAbleToUndo(): void {
        this.playerService.ableToUndo().then(ableToUndo => this.ableToUndo = ableToUndo);
    }

    goBack(): void {
        this.navController.back();
    }

    toggleSortByScore(): void {
        this.sortPlayers();
    }

    private sortPlayers(): void {
        let sort: (a: Player, b: Player) => number;
        sort = !this.sortByScore ? ((a, b) => b.score - a.score) : ((a, b) => a.id - b.id);
        this.players.sort(sort);
    }

    public async toggleUndoAlert(): Promise<void> {
        const undoAlert = await this.alertController.create({
            header: 'Undo last round?',
            subHeader: 'This action cannot be undone',
            buttons: [
                'Cancel',
                {
                    text: 'Undo',
                    handler: () => this.undoLastRound()
                }
            ]
        });

        await undoAlert.present();
    }

    private undoLastRound(): void {
        this.playerService.undoLastRound().then(() => this.fetchPlayers());
    }
}
