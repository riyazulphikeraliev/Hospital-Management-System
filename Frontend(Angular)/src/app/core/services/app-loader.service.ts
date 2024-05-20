import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoaderService {

  loaderVisibility$ = new Subject<boolean>();
  loaderText!: string | null;

  constructor() { }

  start(text: string | null = 'loading...'): void {
    this.loaderText = text;
    this.loaderVisibility$.next(true);
  }

  stop(): void {
    this.loaderVisibility$.next(false);
  }
}
