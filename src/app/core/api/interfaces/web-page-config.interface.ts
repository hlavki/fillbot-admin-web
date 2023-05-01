export interface IWebPageConfigDto {
  address: IAddressWebConfigDto;
  company: ICompanyWebConfigDto;
  email: IEmailWebConfigDto;
  phoneNumber: IPhoneNumberWebConfigDto;
}

export interface IAddressWebConfigDto {
  enabled: boolean;
  showValidationState: boolean;
  useGeolocation: boolean;
  allowedCountries: string[];
  validators: IWebConfigValidatorDto[];
}

export interface ICompanyWebConfigDto {
  enabled: boolean;
  showValidationState: boolean;
  allowedCountries: string[];
  validators: IWebConfigValidatorDto[];
}

export interface IEmailWebConfigDto {
  enabled: boolean;
  showValidationState: boolean;
  validators: IWebConfigValidatorDto[];
}

export interface IPhoneNumberWebConfigDto {
  enabled: boolean;
  showValidationState: boolean;
  validators: IWebConfigValidatorDto[];
}

export interface IWebConfigValidatorDto {
  name: string;
  mappings: IWebConfigFieldMappingDto[];
}

export interface IWebConfigFieldMappingDto {
  element: string;
  mappedAs: string;
}
