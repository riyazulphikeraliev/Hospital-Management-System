import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStaffComponent } from './get-staff.component';

describe('GetStaffComponent', () => {
  let component: GetStaffComponent;
  let fixture: ComponentFixture<GetStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
