/**
 * To make the element style display=none.
 * @author Vishnu Somanath
 * @version 1.0.0
 * @param {boolean} nggtDisplayNone - boolean
 * @return {void}
 * @example
 * <div nggtDisplayNone="false"><div />
 */
import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[nggtDisplayNone]'
})
export class DisplayNoneDirective implements OnChanges, AfterViewInit {

    /* Public Properties */
    isHidden: boolean = false;

    constructor(
        private el: ElementRef
    ) { }

    @Input() set nggtDisplayNone(isHidden: boolean) {
        this.isHidden = isHidden;
    }

    /* Life Cycle Hooks */
    ngOnChanges(changes: SimpleChanges): void { this.setVisibility(); }

    ngAfterViewInit(): void { this.setVisibility(); }

    /* Private Methods */
    private setVisibility(): void {
        if (this.el && this.el.nativeElement && this.el.nativeElement.style) {
            if (this.isHidden) {
                this.el.nativeElement.style.display = 'none';
            } else {
                this.el.nativeElement.style.display = 'block';
            }
        }
    }
}
