import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPageDetailDialogComponent } from './web-page-detail-dialog.component';

describe('WebPageDetailDialogComponent', () => {
  let component: WebPageDetailDialogComponent;
  let fixture: ComponentFixture<WebPageDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPageDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPageDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
