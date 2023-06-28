import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ScoreBoard, Whist} from './shared/model/Game';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: ScoreBoard.gameType,
    loadChildren: () => import('./score/score.module').then(m => m.ScoreModule)
  },
  {
    path: 'core',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  {
    path: Whist.gameType,
    loadChildren: () => import('./whist/whist.module').then(m => m.WhistModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
