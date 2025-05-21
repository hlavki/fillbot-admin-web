import {ComponentFixture, TestBed} from '@angular/core/testing';
import {KeycloakService} from 'keycloak-angular';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

import {ForbiddenPageComponent} from './forbidden-page.component';

describe('ForbiddenPageComponent', () => {
    let component: ForbiddenPageComponent;
    let fixture: ComponentFixture<ForbiddenPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, ForbiddenPageComponent],
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

        fixture = TestBed.createComponent(ForbiddenPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
