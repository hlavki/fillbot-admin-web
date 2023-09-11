import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodDialogComponent } from './payment-method-dialog.component';

describe('PaymentMethodDialogComponent', () => {
  let component: PaymentMethodDialogComponent;
  let fixture: ComponentFixture<PaymentMethodDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodDialogComponent],
    });
    fixture = TestBed.createComponent(PaymentMethodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
