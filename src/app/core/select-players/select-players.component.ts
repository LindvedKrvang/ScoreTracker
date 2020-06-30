import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Player} from '../../shared/model/Player';
import {EditNameComponent} from '../edit-name/edit-name.component';
import {PlayerService} from '../../shared/services/player.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Game, ScoreBoard, Whist} from '../../shared/model/Game';

@Component({
    selector: 'app-select-players',
    templateUrl: './select-players.component.html',
    styleUrls: ['./select-players.component.scss'],
})
export class SelectPlayersComponent implements OnInit {

    public game: Game;
    public players: Player[] = [];

    constructor(private alertController: AlertController,
                private modalController: ModalController,
                private playerService: PlayerService,
                private route: ActivatedRoute,
                private router: Router
    ) {
    }

    ngOnInit(): void {
        this.game = this.route.snapshot.data.game;
    }

    ionViewWillEnter(): void {
        this.playerService.getAllPlayers().then(players => this.players = players);
    }

    public async addPlayer(): Promise<void> {
        const modal = await this.modalController.create({
            component: EditNameComponent,
            componentProps: {
                title: 'Create player'
            }
        });

        modal.present();
        const {data} = await modal.onDidDismiss();
        if (data) {
            this.createPlayer(data.name);
        }
    }

    public async editPlayerClicked(player: Player): Promise<void> {
        const modal = await this.modalController.create({
            component: EditNameComponent,
            componentProps: {
                title: 'Edit player',
                player
            }
        });

        modal.present();
        const {data} = await modal.onDidDismiss();
        if (data) {
            player.name = data.name;
            this.updatePlayer(player);
        }
    }

    public async deletePlayerClicked(player: Player): Promise<void> {
        const alert = await this.alertController.create({
            header: `Delete ${player.name}?`,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                }, {
                    text: 'Yes',
                    handler: () => {
                        this.removePlayer(player);
                    }
                }
            ]
        });
        await alert.present();
    }

    get isRequiredPlayers(): boolean {
        if (!!this.game.requiredPlayers) {
            return this.players.length === this.game.requiredPlayers;
        }
        return true;
    }

    get isMaxNumberOfPlayers(): boolean {
        if (!!this.game.requiredPlayers) {
            return this.players.length === this.game.requiredPlayers;
        }
        return false;
    }

    private createPlayer(name: string): void {
        const player: Player = this.playerService.createPlayer(name);
        this.players.push(player);
        this.playerService.updateAllPlayers(this.players);
    }

    private removePlayer(player: Player): void {
        const index = this.players.indexOf(player);
        if (index < 0) {
            return;
        }
        this.players.splice(index, 1);
        this.playerService.updateAllPlayers(this.players);
    }

    private updatePlayer(player: Player): void {
        const index = this.players.findIndex(p => p.id === player.id);
        if (index < 0) {
            return;
        }
        this.players[index] = player;
        this.playerService.updateAllPlayers(this.players);
    }

    public navigateToSelectedGame(): void {
        this.router.navigate([this.game.gameType]);
    }
}
