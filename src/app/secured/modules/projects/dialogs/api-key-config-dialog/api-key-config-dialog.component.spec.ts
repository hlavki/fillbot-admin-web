import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyConfigDialogComponent } from './api-key-config-dialog.component';

describe('ApiKeyConfigDialogComponent', () => {
  let component: ApiKeyConfigDialogComponent;
  let fixture: ComponentFixture<ApiKeyConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiKeyConfigDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiKeyConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
