import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {SelectPlayersComponent} from './select-players/select-players.component';
import {EditNameComponent} from './edit-name/edit-name.component';
import {PlayerService} from './services/player.service';
import {Keyboard} from '@ionic-native/keyboard';

@NgModule({
    entryComponents: [
        EditNameComponent
    ],
    declarations: [
        HeaderComponent,
        SelectPlayersComponent,
        EditNameComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'players',
                component: SelectPlayersComponent
            }
        ]),
        IonicModule
    ],
    exports: [
        HeaderComponent,
    ],
    providers: [
        PlayerService
    ]
})
export class CoreModule {
}
