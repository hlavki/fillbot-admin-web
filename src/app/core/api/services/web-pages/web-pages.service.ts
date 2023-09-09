import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {IWebPageDto} from '../../interfaces/web-page-dto.interface';
import {IPricingTierDto} from '../../interfaces/pricing-tier-dto.interface';
import {IWebPageConfigDto} from '../../interfaces/web-page-config.interface';

@Injectable({
  providedIn: 'root',
})
export class WebPagesService {
  private readonly BASE_URL: string = '/api/web-pages';

  constructor(private readonly http: HttpClient) {
  }

  getWebPages(): Observable<IWebPageDto[]> {
    return this.http.get<IWebPageDto[]>(this.BASE_URL);
  }

  createWebPage(webPage: IWebPageDto): Observable<void> {
    return this.http.post<void>(this.BASE_URL, webPage);
  }

  deleteWebPage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  getPricingTiers(lang: string): Observable<IPricingTierDto[]> {
    return this.http.get<IPricingTierDto[]>(`${this.BASE_URL}/pricing-tiers`, {headers: {'Accept-Language': lang}});
  }

  getWebPage(id: string): Observable<IWebPageDto> {
    return this.http.get<IWebPageDto>(`${this.BASE_URL}/${id}`);
  }

  updateWebPageConfig(id: string, webPageConfig: IWebPageConfigDto): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${id}/config`, webPageConfig);
  }

  getWebPageConfig(id: string): Observable<IWebPageConfigDto> {
    return this.http.get<IWebPageConfigDto>(`${this.BASE_URL}/${id}/config`);
  }
}
