import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nggt-skeleton-accordian',
  templateUrl: './skeleton-accordian.component.html',
  styleUrls: ['./skeleton-accordian.component.scss']
})
export class SkeletonAccordianComponent implements OnInit {

  @Input() rowCount = 10;

  rows!: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.rows = Array(this.rowCount);
  }
}
