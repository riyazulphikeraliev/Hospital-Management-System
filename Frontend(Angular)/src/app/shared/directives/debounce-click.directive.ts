/**
 * To prevent double clicks.
 * @author Vishnu Somanath
 * @version 1.0.0
 * @return {void}
 * @example
 * <button nggtDebounceClick (debounceClick)="click()" [debounceTime]="700"></button>
 */
import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[nggtDebounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {

  @Input() debounceTime = 500;
  @Output() debounceClick = new EventEmitter();

  private clicks = new Subject();
  private subscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}