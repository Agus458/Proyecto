import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Front';
  mediaSub: Subscription | undefined;

  mobile: boolean = false;

  constructor(public mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.mobile = result.mqAlias == 'xs';
    });
  }

  ngOnDestroy(): void {
    this.mediaSub?.unsubscribe();
  }
}
