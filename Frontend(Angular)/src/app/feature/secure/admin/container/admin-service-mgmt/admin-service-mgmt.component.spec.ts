import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServiceMgmtComponent } from './admin-service-mgmt.component';

describe('AdminServiceMgmtComponent', () => {
  let component: AdminServiceMgmtComponent;
  let fixture: ComponentFixture<AdminServiceMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminServiceMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServiceMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
