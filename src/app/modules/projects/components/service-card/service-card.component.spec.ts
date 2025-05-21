import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';

import {ServiceCardComponent} from './service-card.component';

describe('ServiceCardComponent', () => {
    let component: ServiceCardComponent;
    let fixture: ComponentFixture<ServiceCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [ReactiveFormsModule, ServiceCardComponent],
            providers: [
                {
                    provide: FormBuilder,
                },
                {
                    provide: MatDialog,
                    useValue: {
                        open: () => ({
                            afterClosed: () => of({success: true}),
                        }),
                    },
                },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ServiceCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
