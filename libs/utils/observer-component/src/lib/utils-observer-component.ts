import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  template: '',
})
export abstract class ObserverComponent implements OnDestroy {
  subPool: Subscription[] = [];
  observe<T>(
    subject: Observable<T>,
    onChange: (value: T) => void
  ): Subscription {
    const sub = subject?.subscribe(onChange);
    this.subPool.push(sub);
    return sub;
  }

  ngOnDestroy() {
    this.subPool?.forEach((sub) => sub.unsubscribe());
    this.subPool = [];
  }
}
