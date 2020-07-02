import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../shared/components/header/header.component';
import {IonicModule} from '@ionic/angular';
import {SelectPlayersComponent} from './select-players/select-players.component';
import {EditNameComponent} from './edit-name/edit-name.component';
import {SelectGameComponent} from './select-game/select-game.component';
import {SharedModule} from '../shared/shared.module';
import {GameResolver} from '../shared/resolves/game.resolver';
import {RouterModule} from '@angular/router';

@NgModule({
    entryComponents: [
        EditNameComponent
    ],
    declarations: [
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
                path: 'games/:gameType',
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
    ]
})
export class CoreModule {
}
