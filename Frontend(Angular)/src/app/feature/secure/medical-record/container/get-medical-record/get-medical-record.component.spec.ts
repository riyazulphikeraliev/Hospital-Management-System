import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMedicalRecordComponent } from './get-medical-record.component';

describe('GetMedicalRecordComponent', () => {
  let component: GetMedicalRecordComponent;
  let fixture: ComponentFixture<GetMedicalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMedicalRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
