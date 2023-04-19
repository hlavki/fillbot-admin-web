export interface IPricingTierDto {
  code: string;
  name: string;
  order: number;
  validFrom: string;
  validTo: string;
  selected: boolean;
  valid: boolean;
  monthlyPrice: number;
  annualPrice: number;
}
