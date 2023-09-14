import { ECountry } from '../enums/country.enum';
import { ECurrency } from '../enums/currency.enum';
import { IAddressDto } from './address-dto.interface';

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  PAYMENT_CARD = 'PAYMENT_CARD',
}

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
  paymentMethod?: PaymentMethod;
  paymentCardId?: string;
}

export interface IBillingProfileDto extends ICreateBillingProfileDto {
  id: number;
}
