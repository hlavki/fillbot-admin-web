import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebPageDetailDataService {
  private readonly webPageOrigin$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  setOrigin(origin: string): void {
    this.webPageOrigin$.next(origin);
  }

  getOrigin(): Observable<string> {
    return this.webPageOrigin$.asObservable();
  }
}
