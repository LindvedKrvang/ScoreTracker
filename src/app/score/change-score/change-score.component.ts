import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Player} from '../../core/model/Player';

@Component({
    selector: 'app-change-score',
    templateUrl: './change-score.component.html',
    styleUrls: ['./change-score.component.scss'],
})
export class ChangeScoreComponent implements OnInit {

    @Input()
    public player: Player;

    constructor(private modalController: ModalController) {
    }

    ngOnInit(): void {
    }

    async closeModal(): Promise<void> {
        await this.modalController.dismiss();
    }

    public submit(score: number): void {
        this.modalController.dismiss({
            score
        });
    }

    public cancel(): void {
        this.closeModal();
    }
}
