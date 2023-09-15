import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fb-payment-method-dialog',
  templateUrl: './payment-method-dialog.component.html',
  styleUrls: ['./payment-method-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodDialogComponent {

}
