import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services';
import { Chart } from 'chart.js/auto';



@Component({
  selector: 'app-ward-char-report',
  templateUrl: './ward-char-report.component.html',
  styleUrls: ['./ward-char-report.component.scss']
})
export class WardCharReportComponent implements OnInit {
  wardDetails!: any[];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.fetchWardDetails();
  }

  fetchWardDetails() {
    this.profileService.GetWardForReport().subscribe(
      (data: any[]) => {
        this.wardDetails = data;
        this.displayBarGraph();
      },
      (error) => {
        console.error('Error fetching ward details:', error);
      }
    );
  }

  displayBarGraph() {
  const wardNames = this.wardDetails.map((ward) => ward.wardType);
  const wardCounts = this.wardDetails.map((ward) => ward.availableBeds);

  // Create a new Chart.js instance
  const ctx = document.getElementById('wardChart') as HTMLCanvasElement;
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
    labels: wardNames,
    datasets: [
      {
      label: 'Available Beds',
      data: wardCounts,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
      }
    ]
    },
    options: {
    scales: {
      y: {
      beginAtZero: true
      }
    }
    }
  });
  }
}