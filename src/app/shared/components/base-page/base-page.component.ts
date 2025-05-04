import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  standalone: false,
  selector: 'fb-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePageComponent {
  @Input() isLoading: boolean | null = false;
  @Input() heading: string;

  @ContentChild('content', { static: true }) contentRef: TemplateRef<HTMLElement>;
}
