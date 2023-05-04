import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';

import { AuthGuard } from './auth.quard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  let keycloakServiceSpy: any;

  beforeEach(() => {
    keycloakServiceSpy = jasmine.createSpyObj(KeycloakService, {
      login: true,
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: KeycloakService,
          useValue: keycloakServiceSpy,
        },
      ],
    });
  });

  beforeEach(() => {
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should create', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should login when is not authenticated', () => {
    (authGuard as any).authenticated = false;
    authGuard.isAccessAllowed().then();
    expect(keycloakServiceSpy.login).toHaveBeenCalled();
  });
});
