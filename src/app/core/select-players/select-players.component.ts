import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Player} from '../model/Player';
import {EditNameComponent} from '../edit-name/edit-name.component';
import {PlayerService} from '../services/player.service';

@Component({
    selector: 'app-select-players',
    templateUrl: './select-players.component.html',
    styleUrls: ['./select-players.component.scss'],
})
export class SelectPlayersComponent implements OnInit {

    private players: Player[] = [];

    constructor(private alertController: AlertController,
                private modalController: ModalController,
                private playerService: PlayerService) {
    }

    ngOnInit(): void {
    }

    ionViewWillEnter(): void {
        this.playerService.getAllPlayers().then(players => this.players = players);
    }

    ionViewWillLeave(): void {
        this.playerService.updateAllPlayers(this.players);
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
            const player: Player = this.playerService.createPlayer(data.name);
            this.players.push(player);
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

    private removePlayer(player: Player): void {
        const index = this.players.indexOf(player);
        if (index < 0) {
            return;
        }
        this.players.splice(index, 1);
    }

    private updatePlayer(player: Player): void {
        const index = this.players.findIndex(p => p.id === player.id);
        if (index < 0) {
            return;
        }
        this.players[index] = player;
    }
}
