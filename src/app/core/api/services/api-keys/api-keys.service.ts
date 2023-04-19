import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IApiKeyConfigDto, IApiKeyDto } from '../../interfaces/api-key-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiKeysService {
  private readonly BASE_URL: string = '/api/api-keys';

  constructor(
    private readonly http: HttpClient,
  ) {}

  getApiKeys(): Observable<IApiKeyDto[]> {
    return this.http.get<IApiKeyDto[]>(this.BASE_URL);
  }

  createApiKey(apiKey: IApiKeyDto): Observable<void> {
    return this.http.post<void>(this.BASE_URL, apiKey);
  }

  deleteApiKey(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  getApiKeyConfig(id: string): Observable<IApiKeyConfigDto> {
    return this.http.get<IApiKeyConfigDto>(`${this.BASE_URL}/${id}/config`);
  }

  updateApiKeyConfig(id: string, apiKeyConfig: IApiKeyConfigDto): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${id}/config`, apiKeyConfig);
  }
}
