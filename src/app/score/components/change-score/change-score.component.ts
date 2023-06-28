import {Player} from '../../../shared/model/Player';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import {IonInput, ModalController} from '@ionic/angular';


@Component({
    selector: 'app-change-score',
    templateUrl: './change-score.component.html',
    styleUrls: ['./change-score.component.scss'],
    providers: []
})
export class ChangeScoreComponent implements OnInit {

    @ViewChild('score', { static: true }) input?: IonInput;

    @Input()
    public player?: Player;

    constructor(private modalController: ModalController) {
    }

    ngOnInit(): void {
    }

    ionViewDidEnter(): void {
        this.input?.setFocus();
        Keyboard.show();
    }

    async closeModal(): Promise<void> {
        await this.modalController.dismiss();
    }

    public submit(score: number | string): void {
      this.modalController.dismiss({
          score
      });
    }

    public cancel(): void {
        this.closeModal();
    }
}
