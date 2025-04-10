import { Observable } from 'rxjs';
import { Location } from './Location';

export interface LocationServicesInterface {
  getLocations(organizationId: string): Observable<Location[]>;
  getLocation(id: string): Observable<Location>;
  createLocation(location: Partial<Location>): Observable<Location>;
  updateLocation(id: string, location: Partial<Location>): Observable<Location>;
  deleteLocation(id: string): Observable<void>;
}
