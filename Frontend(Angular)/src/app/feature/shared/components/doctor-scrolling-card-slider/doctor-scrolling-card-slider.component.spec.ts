import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScrollingCardSliderComponent } from './doctor-scrolling-card-slider.component';

describe('DoctorScrollingCardSliderComponent', () => {
  let component: DoctorScrollingCardSliderComponent;
  let fixture: ComponentFixture<DoctorScrollingCardSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScrollingCardSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorScrollingCardSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
