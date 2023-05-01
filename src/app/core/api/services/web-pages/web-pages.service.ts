import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IWebPageDto } from '../../interfaces/web-page-dto.interface';
import { IPricingTierDto } from '../../interfaces/pricing-tier-dto.interface';
import { IWebPageConfigDto } from '../../interfaces/web-page-config.interface';

@Injectable({
  providedIn: 'root',
})
export class WebPagesService {
  private readonly BASE_URL: string = '/api/web-pages';

  constructor(private readonly http: HttpClient) {}

  getWebPages(): Observable<IWebPageDto[]> {
    return this.http.get<IWebPageDto[]>(this.BASE_URL);
  }

  createWebPage(webPage: IWebPageDto): Observable<void> {
    return this.http.post<void>(this.BASE_URL, webPage);
  }

  deleteWebPage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  getPricingTiers(): Observable<IPricingTierDto[]> {
    return this.http.get<IPricingTierDto[]>(`${this.BASE_URL}/pricing-tiers`);
  }

  getWebPage(id: string): Observable<IWebPageDto> {
    return this.http.get<IWebPageDto>(`${this.BASE_URL}/${id}`);
  }

  updateWebPageConfig(id: string, webPageConfig: IWebPageConfigDto): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${id}/config`, webPageConfig);
  }

  getWebPageConfig(id: string): Observable<IWebPageConfigDto> {
    return this.http
      .get<IWebPageConfigDto>(`${this.BASE_URL}/${id}/config`)
      .pipe(
        map(() => ({
          address: {
            enabled: true,
            validators: [
              {
                name: 'Dorucovacia adresa',
                mappings: [
                  {
                    element: '[name="address"]',
                    mappedAs: 'streetWithNumber',
                  },
                  {
                    element: '[name="city"]',
                    mappedAs: 'registrationNumber',
                  },
                  {
                    element: '[name="zip"]',
                    mappedAs: 'zipCode',
                  },
                  {
                    element: '[name="country"]',
                    mappedAs: 'country',
                  },
                ],
              },
              {
                name: 'Dorucovacia adresa 2',
                mappings: [
                  {
                    element: '[name="address"]',
                    mappedAs: 'streetWithNumber',
                  },
                  {
                    element: '[name="city"]',
                    mappedAs: 'registrationNumber',
                  },
                  {
                    element: '[name="zip"]',
                    mappedAs: 'zipCode',
                  },
                  {
                    element: '[name="country"]',
                    mappedAs: 'country',
                  },
                ],
              },
            ],
            useGeolocation: true,
            showValidationState: true,
            allowedCountries: [],
          },
          company: {
            enabled: true,
            validators: [],
            showValidationState: true,
            allowedCountries: [],
          },
          email: {
            enabled: true,
            validators: [
              {
                name: 'Email 1',
                mappings: [
                  {
                    element: '[name="address"]',
                    mappedAs: 'email',
                  },
                ],
              },
            ],
            showValidationState: true,
          },
          phoneNumber: {
            enabled: true,
            validators: [
              {
                name: 'Phone number 1',
                mappings: [
                  {
                    element: '[name="city"]',
                    mappedAs: 'phoneNumber',
                  },
                ],
              },
            ],
            showValidationState: true,
          },
        }))
      );
  }
}
