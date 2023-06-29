import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MollkyOverviewComponent} from './components/mollky-overview/mollky-overview.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {MollkyScoreComponent} from './components/mollky-score/mollky-score.component';

@NgModule({
  declarations: [
    MollkyOverviewComponent,
    MollkyScoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MollkyOverviewComponent
      },
      {
        path: 'score/players/:playerId',
        component: MollkyScoreComponent
      }
    ]),
    SharedModule,
    IonicModule,
    FormsModule
  ]
})
export class MollkyModule { }
