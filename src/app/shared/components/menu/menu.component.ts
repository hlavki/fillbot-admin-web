import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Output() selected: EventEmitter<void> = new EventEmitter<void>();

  readonly expanded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  readonly expandedIndex$: BehaviorSubject<number> =  new BehaviorSubject<number>(0);

  constructor(
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('/settings')) {
      this.expandedIndex$.next(3);
    } else if (this.router.url.includes('/projects')) {
      this.expandedIndex$.next(1);
    }
  }
}
