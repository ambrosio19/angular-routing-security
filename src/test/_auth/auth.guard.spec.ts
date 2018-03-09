import {AuthService} from '../../app/_auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {AuthGuardService} from '../../app/_auth/auth-guard.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ErrorHandlerService} from '../../app/_shared/error-handler.service';

describe('AuthGuard', () => {
  let mockErrorHandlerService: MockErrorHandlerService;
  class MockErrorHandlerService {
    public unauthorizedRole = () => {};
    public unauthorizedUser = () => {};
  }

  let authGuardService: AuthGuardService;
  let authService: AuthService;

  const route = new ActivatedRouteSnapshot();
  const state = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, AuthGuardService, {provide: ErrorHandlerService, useClass: MockErrorHandlerService}]
    });

    authGuardService = TestBed.get(AuthGuardService);
    authService = TestBed.get(AuthService);
    mockErrorHandlerService = TestBed.get(ErrorHandlerService);
  });

  it('should can activate the user with role', async(() => {
    authService.setCurrentUser({name: 'Jhon Doe',
      email: `jhon-doe@test`,
      roles: ['ROLE_ADMIN'],
      imageUrl: 'https://image.jpg'});

    route.data = {
      allowRoles: ['ROLE_USER', 'ROLE_ADMIN']
    };

    expect(authGuardService.canActivate(route, state)).toBeTruthy();
  }));

  it('should can not activate the user without role', async(() => {
    authService.setCurrentUser({name: 'Jhon Doe',
      email: `jhon-doe@test`,
      roles: ['ROLE_USER'],
      imageUrl: 'https://image.jpg'});

    route.data = {
      allowRoles: ['ROLE_ADMIN']
    };

    spyOn(mockErrorHandlerService, 'unauthorizedRole');
    expect(authGuardService.canActivate(route, state)).toBeFalsy();
    expect(mockErrorHandlerService.unauthorizedRole).toHaveBeenCalled();
  }));

  it('should can not activate when user is logout', async(() => {
    authService.logout();

    route.data = {
      allowRoles: ['ROLE_USER', 'ROLE_ADMIN']
    };

    spyOn(mockErrorHandlerService, 'unauthorizedUser');
    expect(authGuardService.canActivate(route, state)).toBeFalsy();
    expect(mockErrorHandlerService.unauthorizedUser).toHaveBeenCalled();
  }));

});
