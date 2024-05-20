import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientBillComponent } from './add-patient-bill.component';

describe('AddPatientBillComponent', () => {
  let component: AddPatientBillComponent;
  let fixture: ComponentFixture<AddPatientBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
