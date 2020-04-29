import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {SelectPlayersComponent} from './select-players/select-players.component';
import {EditNameComponent} from './edit-name/edit-name.component';
import {PlayerService} from './services/player.service';
import {SelectGameComponent} from './select-game/select-game.component';
import {GameResolver} from './resolves/GameResolver';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    entryComponents: [
        EditNameComponent
    ],
    declarations: [
        HeaderComponent,
        SelectPlayersComponent,
        SelectGameComponent,
        EditNameComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'selectGame',
                component: SelectGameComponent
            },
            {
                path: 'games/:gameName',
                resolve: {
                    game: GameResolver
                },
                children: [
                    {
                        path: 'players',
                        component: SelectPlayersComponent
                    }
                ]
            }
        ]),
        IonicModule,
        SharedModule
    ],
    exports: [
        HeaderComponent,
    ],
    providers: [
        PlayerService,
        GameResolver
    ]
})
export class CoreModule {
}
