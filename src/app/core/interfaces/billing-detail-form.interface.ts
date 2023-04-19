import { ECountry } from '../api/enums/country.enum';
import { ECurrency } from '../api/enums/currency.enum';
import { EBillingType } from '../enums/billing-type.enum';

export interface IBillingDetailForm {
  category: EBillingType,
  companyName: string,
  firstName: string,
  lastName: string,
  cin: string,
  vatId: string,
  street: string,
  referenceNumber: string,
  registerNumber: string,
  zipCode: string,
  city: string,
  country: ECountry
  currency: ECurrency
}
