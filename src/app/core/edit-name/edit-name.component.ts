import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Player} from '../../shared/model/Player';
import {IonInput, ModalController} from '@ionic/angular';
import {Keyboard} from '@ionic-native/keyboard/ngx';

@Component({
    selector: 'app-edit-name',
    templateUrl: './edit-name.component.html',
    styleUrls: ['./edit-name.component.scss'],
    providers: [Keyboard]
})
export class EditNameComponent implements OnInit {

    @ViewChild('input') input: IonInput;

    @Input()
    public title: string;

    @Input()
    public player: Player;

    constructor(private modalController: ModalController,
                private keyboard: Keyboard) {
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

    public submit(name: string): void {
        this.modalController.dismiss({
            name
        });
    }

    public cancel(): void {
        this.closeModal();
    }
}
