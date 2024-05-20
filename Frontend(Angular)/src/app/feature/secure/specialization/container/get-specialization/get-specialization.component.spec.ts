import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSpecializationComponent } from './get-specialization.component';

describe('GetSpecializationComponent', () => {
  let component: GetSpecializationComponent;
  let fixture: ComponentFixture<GetSpecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSpecializationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
