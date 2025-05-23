import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormatAddressPipe} from './format-address/format-address.pipe';
import {FormatDatePipe} from './format-date/format-date.pipe';
import {FormatDateTimePipe} from './format-date-time/format-date-time.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormatAddressPipe,
        FormatDatePipe,
        FormatDateTimePipe,
    ],
    exports: [
        FormatAddressPipe,
        FormatDatePipe,
        FormatDateTimePipe,
    ],
})
export class PipesModule {
}
