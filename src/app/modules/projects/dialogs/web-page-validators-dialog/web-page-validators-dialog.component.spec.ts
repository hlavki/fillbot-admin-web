import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { WebPageValidatorsDialogComponent } from './web-page-validators-dialog.component';

describe('WebPageValidatorsDialogComponent', () => {
  let component: WebPageValidatorsDialogComponent;
  let fixture: ComponentFixture<WebPageValidatorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebPageValidatorsDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => void 0 as unknown,
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [],
        },
      ],
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
