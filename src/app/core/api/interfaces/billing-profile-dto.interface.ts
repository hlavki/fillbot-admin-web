import { ECountry } from '../enums/country.enum';
import { ECurrency } from '../enums/currency.enum';
import { IAddressDto } from './address-dto.interface';

export interface ICreateBillingProfileDto {
  firstName?: string;
  lastName?: string;
  cin?: string;
  vatId?: string;
  companyName?: string;
  address: IAddressDto;
  country: ECountry;
  currency: ECurrency;
  createdAt?: string;
}

export interface IBillingProfileDto extends ICreateBillingProfileDto {
  id: number;
}
