import { Component, Input } from '@angular/core';

@Component({
  selector: 'nggt-skeleton-list',
  templateUrl: './skeleton-list.component.html',
  styleUrls: ['./skeleton-list.component.scss']
})
export class SkeletonListComponent {

  @Input() rowCount = 5;
}
