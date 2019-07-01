import {Component, OnInit} from '@angular/core';
import {Player} from '../../core/model/Player';
import {ModalController} from '@ionic/angular';
import {ChangeScoreComponent} from '../change-score/change-score.component';
import {ScoreService} from '../services/score.service';
import {PlayerService} from '../../core/services/player.service';


@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

    private players: Player[] = [];

    constructor(private modalController: ModalController,
                private scoreService: ScoreService,
                private playerService: PlayerService) {
    }

    ngOnInit(): void {
    }

    ionViewDidEnter(): void {
        this.playerService.getAllPlayers().then(players => this.players = players);
    }

    ionViewWillLeave(): void {
        this.playerService.updateAllPlayers(this.players);
    }

    public async openAdScoreModal(player: Player): Promise<void> {
        const modal = this.openModal(player);
        this.onModalDismiss(modal, player, this.scoreService.addScore);
    }

    public async openSubtractScoreModal(player: Player): Promise<void> {
        const modal = this.openModal(player);
        this.onModalDismiss(modal, player, this.scoreService.subtractScore);
    }

    private async openModal(player: Player): Promise<HTMLIonModalElement> {
        return await this.modalController.create({
            component: ChangeScoreComponent,
            componentProps: {player},
            cssClass: 'modal-class',
        });
    }

    private async onModalDismiss(modal: Promise<HTMLIonModalElement>,
                                 player: Player,
                                 method: (player: Player, score: number) => void): Promise<void> {
        await modal.then(async m => {
            m.present();
            const {data} = await m.onDidDismiss();
            if (data) {
                method(player, data.score);
            }
        });
    }
}
