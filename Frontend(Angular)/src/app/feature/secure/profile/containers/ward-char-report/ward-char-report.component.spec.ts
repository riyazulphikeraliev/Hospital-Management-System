import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardCharReportComponent } from './ward-char-report.component';

describe('WardCharReportComponent', () => {
  let component: WardCharReportComponent;
  let fixture: ComponentFixture<WardCharReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardCharReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WardCharReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
