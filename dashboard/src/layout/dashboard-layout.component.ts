import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf, NgFor } from "@angular/common";
import { MatSidenavContainer, MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatBadgeModule } from "@angular/material/badge";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatIconButton } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { JwtPayload } from "../services/auth/domain/JwtPayload";
import { IAuthService } from "../services/auth/domain/IAuthService";
import { ApiAuthService } from "../services/auth/infrastructure/ApiAuthService";
import { Location } from "../services/shared/domain/Location";
import { LocationServicesInterface } from "../services/shared/domain/LocationServicesInterface";
import { ApiLocationService } from "../services/shared/infrastructure/ApiLocationService";
import { LocationStateService } from "../services/shared/infrastructure/LocationStateService";

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    RouterOutlet,
    MatIconButton,
    RouterLink,
    NgIf,
    NgFor,
    MatSelectModule
  ],
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isHandset$: Observable<boolean> | undefined;
  user: JwtPayload;
  organizationName: string = '';
  locations: Location[] = [];
  selectedLocation: Location | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    @Inject(ApiAuthService) private authService: IAuthService,
    @Inject(ApiLocationService) private locationService: LocationServicesInterface,
    private locationStateService: LocationStateService,
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    this.user = this.authService.getPayload();
  }

  ngOnInit(): void {
    this.user = this.authService.getPayload();
    this.organizationName = this.authService.getOrganization(this.user.organizationId)?.name ?? '';
    
    // Cargar ubicaciones
    this.locationService.getLocations(this.user.organizationId).subscribe(
      locations => {
        this.locations = locations;
        // Seleccionar la primera ubicación por defecto si existe
        if (locations.length > 0) {
          this.onLocationChange(locations[0]);
        }
      }
    );
  }

  onLocationChange(location: Location | null): void {
    if (location) {
      this.selectedLocation = location;
      this.locationStateService.setSelectedLocation(location);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
