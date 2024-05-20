/**
 * Fullscreen
 * @author Vishnu Somanath
 * @version 1.0.0
 * @return {void}
 * @example
 * <div  nggtFullScreen />
 */
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[nggtFullScreen]'
})
export class FullScreenDirective {

  /* Public Properties */
  isFullScreen = false;
  elem = document.documentElement;

  /* DOM Listeners */
  @HostListener('click') onClick(): void {
    this.toggleFullScreen();
  }

  /* Private Methods */
  private toggleFullScreen(): void {
    let methodToBeInvoked;
    let elem;
    if (!this.isFullScreen) {
      elem = document.documentElement as any;
      this.isFullScreen = !this.isFullScreen;
      methodToBeInvoked = elem.requestFullscreen ||
        elem.webkitRequestFullScreen || elem.mozRequestFullscreen
        ||
        elem.msRequestFullscreen;
    } else {
      elem = document as any;
      this.isFullScreen = !this.isFullScreen;
      methodToBeInvoked = elem.cancelFullScreen ||
        elem.webkitExitFullscreen || elem.mozCancelFullScreen
        ||
        elem.msExitFullscreen;
    }
    if (methodToBeInvoked) { methodToBeInvoked.call(elem); }
  }
}
