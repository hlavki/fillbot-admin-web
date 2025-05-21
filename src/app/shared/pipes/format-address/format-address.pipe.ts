import {Pipe, PipeTransform} from '@angular/core';

import {IAddressDto} from '@core/api/interfaces/address-dto.interface';

@Pipe({name: 'appFormatAddress',})
export class FormatAddressPipe implements PipeTransform {

    transform(value: IAddressDto | undefined): unknown {
        return value ?
            `${value.street} ${value.registerNumber}/${value.referenceNumber}, ${value.zipCode} ${value.city}` :
            '';
    }

}
