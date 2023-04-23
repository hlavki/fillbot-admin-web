import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPageConfigDialogComponent } from './web-page-config-dialog.component';

describe('WebPageConfigDialogComponent', () => {
  let component: WebPageConfigDialogComponent;
  let fixture: ComponentFixture<WebPageConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPageConfigDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPageConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
