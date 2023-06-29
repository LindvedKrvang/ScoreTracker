import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerService} from './services/player.service';
import {GameService} from './services/game.service';
import {HeaderComponent} from './components/header/header.component';
import {IonicModule} from '@ionic/angular';
import {ScoreService} from './services/score.service';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    providers: [
        PlayerService,
        GameService,
        ScoreService
    ],
    exports: [
        HeaderComponent
    ]
})
export class SharedModule {
}
