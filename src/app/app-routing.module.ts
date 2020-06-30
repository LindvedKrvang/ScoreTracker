import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ScoreBoard, Whist} from './shared/model/Game';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: './home/home.module#HomePageModule'},
    {path: ScoreBoard.gameType, loadChildren: './score/score.module#ScoreModule'},
    {path: 'core', loadChildren: './core/core.module#CoreModule'},
    {path: Whist.gameType, loadChildren: './whist/whist.module#WhistModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
