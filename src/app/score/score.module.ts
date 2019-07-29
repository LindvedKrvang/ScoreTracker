import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {CoreModule} from '../core/core.module';
import {IonicModule} from '@ionic/angular';
import {ChangeScoreComponent} from './change-score/change-score.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [OverviewComponent, ChangeScoreComponent],
  entryComponents: [ChangeScoreComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'overview',
                component: OverviewComponent
            }
        ]),
        CoreModule,
        IonicModule,
        FormsModule
    ],
})
export class ScoreModule { }
