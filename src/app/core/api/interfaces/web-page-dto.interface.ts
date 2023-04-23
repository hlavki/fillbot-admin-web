import { IBillingProfileDto } from './billing-profile-dto.interface';
import { IPricingTierDto } from './pricing-tier-dto.interface';

export interface IWebPageDto {
  id?: string;
  name: string;
  originSite: string;
  createdAt?: string;
  pricingTier: IPricingTierDto;
  billingProfile: IBillingProfileDto;
  enabled?: boolean;
}
