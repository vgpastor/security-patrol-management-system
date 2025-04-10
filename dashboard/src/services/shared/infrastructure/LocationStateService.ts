import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../domain/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationStateService {
  private selectedLocationSubject = new BehaviorSubject<Location | null>(null);
  selectedLocation$ = this.selectedLocationSubject.asObservable();

  setSelectedLocation(location: Location): void {
    this.selectedLocationSubject.next(location);
  }

  getSelectedLocation(): Observable<Location | null> {
    return this.selectedLocation$;
  }
}
