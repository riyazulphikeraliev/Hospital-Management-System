/**
 * To drag drop file inputs.
 * @author Vishnu Somanath
 * @version 1.0.0
 * @return {void}
 * @example
 * <div  nggtFileDragDrop />
 */
import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[nggtFileDragDrop]'
})
export class FileDragDropDirective {

    @Output() readonly fileDropped = new EventEmitter<any>();

    @HostBinding('style.background-color') private background = '#d8d8d81c';
    @HostBinding('style.opacity') private opacity = '1';

    /* DOM Listeners */
    // Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt: any): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'rgb(88 161 247 / 9%)';
        this.opacity = '0.8';
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt: any): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#d8d8d81c';
        this.opacity = '.8';
    }

    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt: any): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#d8d8d81c';
        this.opacity = '.8';
        const files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.fileDropped.emit(files);
        }
    }
}
