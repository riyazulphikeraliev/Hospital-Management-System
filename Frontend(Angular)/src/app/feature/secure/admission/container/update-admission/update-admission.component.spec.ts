import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdmissionComponent } from './update-admission.component';

describe('UpdateAdmissionComponent', () => {
  let component: UpdateAdmissionComponent;
  let fixture: ComponentFixture<UpdateAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
