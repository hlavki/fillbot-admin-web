import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticsTabComponent } from './statics-tab.component';

describe('StaticsTabComponent', () => {
  let component: StaticsTabComponent;
  let fixture: ComponentFixture<StaticsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
