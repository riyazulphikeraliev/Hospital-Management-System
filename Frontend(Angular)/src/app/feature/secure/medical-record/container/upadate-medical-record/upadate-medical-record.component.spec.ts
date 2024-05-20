import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadateMedicalRecordComponent } from './upadate-medical-record.component';

describe('UpadateMedicalRecordComponent', () => {
  let component: UpadateMedicalRecordComponent;
  let fixture: ComponentFixture<UpadateMedicalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpadateMedicalRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpadateMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
