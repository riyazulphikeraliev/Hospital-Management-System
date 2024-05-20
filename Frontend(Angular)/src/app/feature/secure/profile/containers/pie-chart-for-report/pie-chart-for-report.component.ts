import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../services';
import { ChartItem, registerables } from 'chart.js';
import { Chart } from 'chart.js/auto';
import { ComponentBase } from '@shared/abstracts/component-base';
import 'chartjs-plugin-datalabels';

import { render } from 'preact/compat';

@Component({
  selector: 'app-pie-chart-for-report',
  templateUrl: './pie-chart-for-report.component.html',
  styleUrls: ['./pie-chart-for-report.component.scss'],
})
export class PieChartForReportComponent extends ComponentBase {
  ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
  override initVariables(): void {}
  override subscribeEvents(): void {}
  override load(): void {}
  override unload(): void {}

  @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
  billingData: any[] = []; 

  constructor(private profileService: ProfileService) {
    super();
    Chart.register(...registerables); 
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.profileService.GetBillForReport().subscribe((data: any[]) => {
      this.billingData = data;
      this.renderPieChart();
    });
  }

  renderPieChart(): void {
    const labels = this.billingData.map((item) => item.monthName);
    const dataValues = this.billingData.map((item) => item.totalAmount);

    const ctx = this.myPieChart.nativeElement.getContext('2d') as ChartItem;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total income',
          data: dataValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          
          datalabels: {
            formatter: (value: any, context: any) => {
              const index = context.dataIndex;
              const amount = dataValues[index];
              return `$${amount}`; 
            },
            color: '#fff', // Label text color
            anchor: 'end', // Position of label anchor
            align: 'start', // Text alignment
            offset: 0, // Label offset from anchor
            font: {
              weight: 'bold' // Label font weight
            }
          }
        }
      }
    });
  }
}
