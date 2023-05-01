import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPageValidatorsDialogComponent } from './web-page-validators-dialog.component';

describe('WebPageValidatorsDialogComponent', () => {
  let component: WebPageValidatorsDialogComponent;
  let fixture: ComponentFixture<WebPageValidatorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPageValidatorsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPageValidatorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
