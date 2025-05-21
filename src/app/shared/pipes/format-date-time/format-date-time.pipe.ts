import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'fbFormatDateTime',})
export class FormatDateTimePipe implements PipeTransform {

    transform(date: string, format?: string): string | null {
        return date ? moment(date, 'YYYY-MM-DDTHH:mm').format(format || 'DD.MM.YYYY HH:mm') : null;
    }

}
