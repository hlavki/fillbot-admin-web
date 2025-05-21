import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {BillingService} from '@fb/core/api/services/billing/billing.service';

import {BillingDetailDialogComponent} from './billing-detail-dialog.component';
import {KeycloakService} from 'keycloak-angular';

describe('BillingDetailDialogComponent', () => {
    let component: BillingDetailDialogComponent;
    let fixture: ComponentFixture<BillingDetailDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [ReactiveFormsModule, MatRadioModule, MatSelectModule, MatInputModule, NoopAnimationsModule, BillingDetailDialogComponent],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: undefined,
                },
                {
                    provide: MatDialogRef,
                    useValue: {
                        close: () => void 0 as unknown,
                    },
                },
                {
                    provide: FormBuilder,
                },
                {
                    provide: BillingService,
                    useValue: {
                        updateBillingProfile: () => of(void 0),
                    },
                },
                {
                    provide: KeycloakService,
                    useValue: {
                        logout: () => void 0 as unknown,
                    },
                },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(BillingDetailDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
