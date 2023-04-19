import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDetailDialogComponent } from './billing-detail-dialog.component';

describe('BillingDetailDialogComponent', () => {
  let component: BillingDetailDialogComponent;
  let fixture: ComponentFixture<BillingDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingDetailDialogComponent ]
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
