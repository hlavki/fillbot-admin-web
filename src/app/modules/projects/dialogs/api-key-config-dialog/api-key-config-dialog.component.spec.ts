import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { ApiKeysService } from '@fb/core/api/services/api-keys/api-keys.service';

import { ApiKeyConfigDialogComponent } from './api-key-config-dialog.component';

describe('ApiKeyConfigDialogComponent', () => {
  let component: ApiKeyConfigDialogComponent;
  let fixture: ComponentFixture<ApiKeyConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiKeyConfigDialogComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => void 0 as unknown,
          },
        },
        {
          provide: FormBuilder,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            apiKey: 'apiKey',
          },
        },
        {
          provide: ApiKeysService,
          useValue: {
            getApiKeyConfig: () => of({}),
          },
        },
      ],
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
