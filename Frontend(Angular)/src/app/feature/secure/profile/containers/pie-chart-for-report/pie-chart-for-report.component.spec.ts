import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartForReportComponent } from './pie-chart-for-report.component';

describe('PieChartForReportComponent', () => {
  let component: PieChartForReportComponent;
  let fixture: ComponentFixture<PieChartForReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartForReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartForReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
