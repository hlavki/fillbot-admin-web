import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ELanguage } from '@fb/core/api/enums/language.enum';
import { UserService } from '@fb/core/api/services/user/user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalPageComponent {
  readonly eLanguage = ELanguage;

  readonly language$: Observable<ELanguage> = this.userService.getUserSettings();

  constructor(
    private readonly userService: UserService,
  ) {}

  onSelected(language: ELanguage): void {
    this.userService.setUserSettings({ language: language });
    // this.userService.updateUserSettings({
    //   language,
    // }).subscribe();
  }
}
