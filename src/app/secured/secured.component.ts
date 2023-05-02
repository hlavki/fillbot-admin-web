import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecuredComponent {}
