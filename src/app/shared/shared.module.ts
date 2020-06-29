import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerService} from './services/player.service';
import {GameResolver} from '../core/resolves/game.resolver';
import {GameService} from './services/game.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        PlayerService,
        GameResolver,
        GameService
    ]
})
export class SharedModule {
}
