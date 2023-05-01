import { ELanguage } from '../enums/language.enum';

export interface ISettingDto {
  settings: {
    language?: ELanguage;
  };
}
