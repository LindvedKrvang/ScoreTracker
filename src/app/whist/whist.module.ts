import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WhistOverviewContainerComponent} from './container/whist-overview-container/whist-overview-container.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {IonicModule} from '@ionic/angular';
import {CalculateWhistScoreComponent} from './components/calculate-whist-score/calculate-whist-score.component';
import {ReactiveFormsModule} from '@angular/forms';
import {WhistCalculatorService} from './services/whist-calculator.service';

@NgModule({
    declarations: [
        WhistOverviewContainerComponent,
        CalculateWhistScoreComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: WhistOverviewContainerComponent
            },
            {
                path: 'calculate',
                component: CalculateWhistScoreComponent
            }
        ]),
        SharedModule,
        CoreModule,
        IonicModule,
        ReactiveFormsModule
    ],
    providers: [
        WhistCalculatorService
    ]
})
export class WhistModule {
}
