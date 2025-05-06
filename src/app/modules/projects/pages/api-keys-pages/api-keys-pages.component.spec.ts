import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';

import {ApiKeysService} from '@fb/core/api/services/api-keys/api-keys.service';
import {NotificationService} from '@fb/core/services/notification/notification.service';
import {FormatAddressPipe} from '@fb/shared/pipes/format-address/format-address.pipe';

import {ApiKeysPagesComponent} from './api-keys-pages.component';

describe('ApiKeysPagesComponent', () => {
    let component: ApiKeysPagesComponent;
    let fixture: ComponentFixture<ApiKeysPagesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [TranslateModule.forRoot({}), ApiKeysPagesComponent, FormatAddressPipe],
            providers: [
                {
                    provide: MatDialog,
                    useValue: {
                        open: () => ({
                            afterClosed: () => of({success: true}),
                        }),
                    },
                },
                {
                    provide: ApiKeysService,
                    useValue: {
                        deleteApiKey: () => void 0 as unknown,
                        getApiKeys: () => of([]),
                    },
                },
                {
                    provide: NotificationService,
                    useValue: {
                        success: () => void 0 as unknown,
                    },
                },
                {
                    provide: Clipboard,
                    useValue: {
                        copy: () => void 0 as unknown,
                    },
                },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ApiKeysPagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
