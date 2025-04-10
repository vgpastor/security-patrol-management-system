import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../domain/Location';
import { LocationServicesInterface } from '../domain/LocationServicesInterface';
import { environment } from '../../../environments/environment';
import { ApiResponse } from './ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiLocationService implements LocationServicesInterface {
  private readonly apiUrl = environment.apiServer + '/api';

  constructor(private http: HttpClient) {}

  getLocations(organizationId: string): Observable<Location[]> {
    return this.http.get<ApiResponse<Location[]>>(`${this.apiUrl}/locations?organizationId=${organizationId}`).pipe(
      map((response: ApiResponse<Location[]>) => response.results)
    );
  }

  getLocation(id: string): Observable<Location> {
    return this.http.get<ApiResponse<Location>>(`${this.apiUrl}/locations/${id}`).pipe(
      map((response: ApiResponse<Location>) => response.results)
    );
  }

  createLocation(location: Partial<Location>): Observable<Location> {
    return this.http.post<ApiResponse<Location>>(`${this.apiUrl}/locations`, location).pipe(
      map((response: ApiResponse<Location>) => response.results)
    );
  }

  updateLocation(id: string, location: Partial<Location>): Observable<Location> {
    return this.http.put<ApiResponse<Location>>(`${this.apiUrl}/locations/${id}`, location).pipe(
      map((response: ApiResponse<Location>) => response.results)
    );
  }

  deleteLocation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/locations/${id}`);
  }
}
