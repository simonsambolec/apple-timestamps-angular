import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
  ],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent {
  apiLoaded: Observable<boolean>;

  constructor(
    httpClient: HttpClient,
  ) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsApiKey, 'callback')
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error('Google Maps API load error:', error);
          return of(false);
        }),
      );
  }

}
