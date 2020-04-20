import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditNameComponent} from './edit-name.component';
import {AngularDelegate, ModalController} from '@ionic/angular';

describe('EditNameComponent', () => {
    let component: EditNameComponent;
    let fixture: ComponentFixture<EditNameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditNameComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [ModalController, AngularDelegate]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
