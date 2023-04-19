import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IBillingProfileDto, ICreateBillingProfileDto } from '../../interfaces/billing-profile-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private readonly BASE_URL: string = '/api/billing/profiles';

  constructor(
    private readonly http: HttpClient,
  ) {}

  checkBillingProfile(): Observable<boolean> {
    return this.http.get(`${this.BASE_URL}/check`, { observe: 'response' }).pipe(
      map((response: HttpResponse<unknown>) => response.status === 200),
    );
  }

  getBillingProfiles(): Observable<IBillingProfileDto[]> {
    return this.http.get<IBillingProfileDto[]>(this.BASE_URL);
  }

  createBillingProfile(billingProfile: ICreateBillingProfileDto): Observable<void> {
    return this.http.post<void>(this.BASE_URL, billingProfile);
  }

  updateBillingProfile(id: number, billingProfile: ICreateBillingProfileDto): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${id}`, billingProfile);
  }

  deleteBillingProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
