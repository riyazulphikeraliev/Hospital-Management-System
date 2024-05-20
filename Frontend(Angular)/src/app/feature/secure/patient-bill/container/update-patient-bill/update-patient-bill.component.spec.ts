import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatientBillComponent } from './update-patient-bill.component';

describe('UpdatePatientBillComponent', () => {
  let component: UpdatePatientBillComponent;
  let fixture: ComponentFixture<UpdatePatientBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePatientBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePatientBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
