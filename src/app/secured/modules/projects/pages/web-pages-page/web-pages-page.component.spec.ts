import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WebPagesPageComponent } from './web-pages-page.component';

describe('WebPagesPageComponent', () => {
  let component: WebPagesPageComponent;
  let fixture: ComponentFixture<WebPagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebPagesPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
