import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModulesComponent} from './modules.component';

describe('ModulesComponent', () => {
    let component: ModulesComponent;
    let fixture: ComponentFixture<ModulesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ModulesComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ModulesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
