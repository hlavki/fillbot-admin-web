import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  standalone: false,
  name: 'fbFormatDate',
})
export class FormatDatePipe implements PipeTransform {

  transform(date: string | undefined, format?: string): string | null {
    return date ? moment(date, 'YYYY-MM-DD').format(format || 'DD.MM.YYYY') : null;
  }

}
