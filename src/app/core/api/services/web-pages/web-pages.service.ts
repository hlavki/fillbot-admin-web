import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IWebPageDto } from '../../interfaces/web-page-dto.interface';
import { Observable } from 'rxjs';
import { IPricingTierDto } from '../../interfaces/pricing-tier-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class WebPagesService {
  private readonly BASE_URL: string = '/api/web-pages';

  constructor(
    private readonly http: HttpClient,
  ) {}

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
}
