import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nggt-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnChanges {

  /* I/O Properties */
  @Input() public startTime!: Date;
  @Input() public timeSpan!: number;
  @Input() public showTimerUi = true;
  @Input() public pause!: boolean;
  @Output() readonly started = new EventEmitter<number>();
  @Output() readonly stopped = new EventEmitter<number>();
  @Output() readonly expired = new EventEmitter<boolean>();
  @Output() readonly tick = new EventEmitter<number>();

  /* Public Properties */
  interval: any;
  remainingTimeSeconds!: number;
  countDown!: string | null;
  constructor() { }

  /* Life Cycle Hooks */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.startTime && changes.startTime.currentValue) {
      clearInterval(this.interval);
      const year = new Date(changes.startTime.currentValue).getFullYear();
      // 0 in ios and 1 in other os
      if (year <= 1) {
        this.stopped.emit(this.remainingTimeSeconds);
        this.remainingTimeSeconds = 0;
        this.countDown = null;
      } else {
        this.setTimer();
      }
    }
  }

  /* Private Methods */
  private setTimer(): void {
    this.startTime = new Date(this.startTime);
    const time = new Date(this.startTime);
    time.setTime(this.startTime.getTime() + (this.timeSpan * 60 * 1000));
    this.remainingTimeSeconds = Math.floor((time.getTime() - new Date().getTime()) / 1000);
    if (this.remainingTimeSeconds > 0) {
      this.started.emit(this.remainingTimeSeconds);
    }
    this.interval = setInterval(() => {
      this.remainingTimeSeconds > 0 ? this.doTick() : this.timeExpired();
    }, 1000);
  }

  private doTick(): void {
    if (!this.pause) {
      this.remainingTimeSeconds--;
      const h = Math.floor(this.remainingTimeSeconds / 3600) % 24;
      const m = Math.floor((this.remainingTimeSeconds / 60) % 60);
      const s = Math.floor(this.remainingTimeSeconds % 60);
      this.countDown = (h < 10 ? `0${h}` : h)
        + ':' + (m < 10 ? `0${m}` : m)
        + ':' + (s < 10 ? `0${s}` : s);
      this.tick.emit(this.remainingTimeSeconds);
    }
  }

  private timeExpired(): void {
    this.countDown = '00:00:00';
    clearInterval(this.interval);
    this.expired.emit(true);
  }
}
