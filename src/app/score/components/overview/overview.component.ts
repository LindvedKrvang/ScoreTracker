import {Component, OnInit} from '@angular/core';
import {Player} from '../../../shared/model/Player';
import {ModalController, NavController} from '@ionic/angular';
import {ChangeScoreComponent} from '../change-score/change-score.component';
import {ScoreService} from '../../services/score.service';
import {PlayerService} from '../../../shared/services/player.service';


@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

    public players: Player[] = [];
    public sortByScore: boolean = false;

    constructor(private modalController: ModalController,
                private scoreService: ScoreService,
                private playerService: PlayerService,
                private navController: NavController) {
    }

    ngOnInit(): void {
    }

    ionViewDidEnter(): void {
        this.playerService.getAllPlayers().then(players => this.players = players);
    }

    ionViewWillLeave(): void {
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
                this.playerService.updateAllPlayers(this.players);
            }
        });
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
