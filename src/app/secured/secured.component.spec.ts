import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredComponent } from './secured.component';

describe('SecuredComponent', () => {
  let component: SecuredComponent;
  let fixture: ComponentFixture<SecuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecuredComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
