import { Component, Input } from '@angular/core';

@Component({
  selector: 'nggt-skeleton-table',
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.scss']
})
export class SkeletonTableComponent {

  @Input() rowCount = 5;
}
