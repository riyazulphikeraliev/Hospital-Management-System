import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSpecializationsComponent } from './get-specializations.component';

describe('GetSpecializationsComponent', () => {
  let component: GetSpecializationsComponent;
  let fixture: ComponentFixture<GetSpecializationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSpecializationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSpecializationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
