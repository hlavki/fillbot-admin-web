import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IWebConfigValidatorDto } from '@fb/core/api/interfaces/web-page-config.interface';

@Component({
  selector: 'app-web-page-validators-dialog',
  templateUrl: './web-page-validators-dialog.component.html',
  styleUrls: ['./web-page-validators-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebPageValidatorsDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly validators: IWebConfigValidatorDto[],
  ) {}
}
