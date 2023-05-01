import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPageDetailPageComponent } from './web-page-detail-page.component';

describe('WebPageDetailPageComponent', () => {
  let component: WebPageDetailPageComponent;
  let fixture: ComponentFixture<WebPageDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPageDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPageDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
