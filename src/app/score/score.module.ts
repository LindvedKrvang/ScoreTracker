import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {OverviewComponent} from './components/overview/overview.component';
import {CoreModule} from '../core/core.module';
import {IonicModule} from '@ionic/angular';
import {ChangeScoreComponent} from './components/change-score/change-score.component';
import {FormsModule} from '@angular/forms';
import {ScoreService} from './services/score.service';

@NgModule({
    declarations: [OverviewComponent, ChangeScoreComponent],
    entryComponents: [ChangeScoreComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: OverviewComponent
            }
        ]),
        CoreModule,
        IonicModule,
        FormsModule
    ],
    providers: [
        ScoreService
    ]
})
export class ScoreModule {
}
