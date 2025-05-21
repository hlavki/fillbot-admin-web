import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {of} from 'rxjs';

import {BillingService} from '@fb/core/api/services/billing/billing.service';
import {NotificationService} from '@fb/core/services/notification/notification.service';

import {BillingPageComponent} from './billing-page.component';

describe('BillingPageComponent', () => {
    let component: BillingPageComponent;
    let fixture: ComponentFixture<BillingPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [TranslateModule.forRoot({}), BillingPageComponent],
            providers: [
                {
                    provide: BillingService,
                    useValue: {
                        deleteBillingProfile: () => of({}),
                        getBillingProfiles: () => of([]),
                    },
                },
                {
                    provide: MatDialog,
                    useValue: {
                        open: () => ({
                            afterClosed: () => of({success: true}),
                        }),
                    },
                },
                {
                    provide: NotificationService,
                    useValue: {
                        success: () => void 0 as unknown,
                    },
                },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(BillingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
