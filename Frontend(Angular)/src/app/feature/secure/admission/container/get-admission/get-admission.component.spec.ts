import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAdmissionComponent } from './get-admission.component';

describe('GetAdmissionComponent', () => {
  let component: GetAdmissionComponent;
  let fixture: ComponentFixture<GetAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAdmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
