import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fb-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModulesComponent {}
