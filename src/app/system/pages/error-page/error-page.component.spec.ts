import {ComponentFixture, TestBed} from '@angular/core/testing';
import {KeycloakService} from 'keycloak-angular';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

import {ErrorPageComponent} from './error-page.component';

describe('ErrorPageComponent', () => {
    let component: ErrorPageComponent;
    let fixture: ComponentFixture<ErrorPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, ErrorPageComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: KeycloakService,
                    useValue: {
                        isLoggedIn: () => of(false),
                    },
                },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ErrorPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
