import {Player} from '../../../shared/model/Player';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {IonInput, ModalController} from '@ionic/angular';


@Component({
    selector: 'app-change-score',
    templateUrl: './change-score.component.html',
    styleUrls: ['./change-score.component.scss'],
    providers: [Keyboard]
})
export class ChangeScoreComponent implements OnInit {

    @ViewChild('score', { static: true }) input: IonInput;

    @Input()
    public player: Player;

    constructor(private modalController: ModalController, private keyboard: Keyboard) {
    }

    ngOnInit(): void {
    }

    ionViewDidEnter(): void {
        this.input.setFocus();
        this.keyboard.show();
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
