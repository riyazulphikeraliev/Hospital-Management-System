import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPatientBillComponent } from './get-patient-bill.component';

describe('GetPatientBillComponent', () => {
  let component: GetPatientBillComponent;
  let fixture: ComponentFixture<GetPatientBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPatientBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPatientBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
