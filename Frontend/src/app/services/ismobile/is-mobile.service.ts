import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription, of as observableOf } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class IsMobileService implements OnInit, OnDestroy {
  
  mediaSub: Subscription | undefined;

  public mobile!: Observable<boolean>;

  constructor(public mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.mobile = observableOf(result.mqAlias == 'xs');
      console.log(this.mobile);
      
    });
  }

  ngOnDestroy(): void {
    this.mediaSub?.unsubscribe();
  }

  getMobile(): Observable<boolean>{
    return this.mobile;
  }

  
}
