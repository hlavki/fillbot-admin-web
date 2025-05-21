import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {BasePageComponent} from './base-page.component';

describe('BasePageComponent', () => {
    let component: BasePageComponent;
    let fixture: ComponentFixture<BasePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BasePageComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();

        fixture = TestBed.createComponent(BasePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
