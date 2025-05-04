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

    create(webPage: IWebPageDto): Observable<void> {
        return this.http.post<void>(this.BASE_URL, webPage, {headers: {'Content-Type': 'application/json'}});
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.BASE_URL}/${id}`);
    }

    getPricingTiers(lang: string): Observable<IPricingTierDto[]> {
        return this.http.get<IPricingTierDto[]>(`${this.BASE_URL}/pricing-tiers`, {headers: {'Accept-Language': lang}});
    }

    getWebPage(id: string): Observable<IWebPageDto> {
        return this.http.get<IWebPageDto>(`${this.BASE_URL}/${id}`);
    }

    updateConfig(id: string, webPageConfig: IWebPageConfigDto): Observable<void> {
        return this.http.put<void>(`${this.BASE_URL}/${id}/config`, webPageConfig);
    }

    getConfig(id: string): Observable<IWebPageConfigDto> {
        return this.http.get<IWebPageConfigDto>(`${this.BASE_URL}/${id}/config`);
    }

    getApiKey(id: string): Observable<string> {
        return this.http.get<string>(`${this.BASE_URL}/${id}/api-key`);
    }
}
