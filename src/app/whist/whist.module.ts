import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WhistOverviewContainerComponent} from './container/whist-overview-container/whist-overview-container.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        WhistOverviewContainerComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: WhistOverviewContainerComponent
            }
        ]),
        SharedModule
    ]
})
export class WhistModule {
}
