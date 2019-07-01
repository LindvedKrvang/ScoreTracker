import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../model/Player';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-edit-name',
    templateUrl: './edit-name.component.html',
    styleUrls: ['./edit-name.component.scss'],
})
export class EditNameComponent implements OnInit {

    @Input()
    public title: string;

    @Input()
    public player: Player;

    constructor(private modalController: ModalController) {
    }

    ngOnInit(): void {
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
