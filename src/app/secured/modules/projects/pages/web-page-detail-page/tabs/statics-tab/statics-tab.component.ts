import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-statics-tab',
  templateUrl: './statics-tab.component.html',
  styleUrls: ['./statics-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticsTabComponent {}
