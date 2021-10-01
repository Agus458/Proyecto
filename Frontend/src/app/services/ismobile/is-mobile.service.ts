import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription, of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsMobileService {

  mediaSub: Subscription | undefined;

  public mobile: boolean = false;

  constructor(public mediaObserver: MediaObserver) {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.mobile = result.mqAlias == 'xs';
    });
  }

  getMobile(): boolean {
    return this.mobile;
  }

}
