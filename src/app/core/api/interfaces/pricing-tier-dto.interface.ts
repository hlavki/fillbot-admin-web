import { IPriceDto } from '@core/api/interfaces/price-dto.interface';

export interface IPricingTierDto {
  code: string;
  monthlyPrice: IPriceDto;
  annualPrice: IPriceDto;
  preset: boolean;
}
