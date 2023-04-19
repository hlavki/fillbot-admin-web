import { IBillingProfileDto } from './billing-profile-dto.interface';

export interface IApiKeyDto {
  id?: string;
  name: string;
  createdAt?: string;
  apiKey?: string;
  enabled?: boolean;
  config?: IApiKeyConfigDto;
  billingProfile: IBillingProfileDto;
}

export interface IApiKeyConfigDto {
  dailyAmountLimit: number | null;
}
