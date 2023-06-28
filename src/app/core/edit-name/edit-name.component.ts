import {Player} from '../../shared/model/Player';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import {IonInput, ModalController} from '@ionic/angular';

@Component({
    selector: 'app-edit-name',
    templateUrl: './edit-name.component.html',
    styleUrls: ['./edit-name.component.scss'],
    providers: []
})
export class EditNameComponent implements OnInit {

    @ViewChild('input', { static: true }) input?: IonInput;

    @Input()
    public title?: string;

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

    public submit(name: string | number): void {
        this.modalController.dismiss({
            name
        });
    }

    public cancel(): void {
        this.closeModal();
    }
}
