import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IntegrationTabComponent} from './integration-tab.component';

describe('IntegrationTabComponent', () => {
    let component: IntegrationTabComponent;
    let fixture: ComponentFixture<IntegrationTabComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IntegrationTabComponent],
        });
        fixture = TestBed.createComponent(IntegrationTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
