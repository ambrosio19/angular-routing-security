import {async, TestBed} from '@angular/core/testing';
import {AuthService} from '../../app/_auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ErrorHandlerService} from '../../app/_shared/error-handler.service';
import {NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

describe('ErrorHandler', () => {
  let authService: AuthService;
  let errorHandlerService: ErrorHandlerService;

  let mockRouter: MockRouter;
  class MockRouter {
    public navigationEndSubject = new BehaviorSubject<NavigationEnd>(new NavigationEnd(0, '/login', '/users'));
    public events = this.navigationEndSubject.asObservable();
    public url = 'testingUrl';

    public navigateByUrl = () => {};
    public navigate = () => {};
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, ErrorHandlerService, {provide: Router, useClass: MockRouter}]
    });

    authService = TestBed.get(AuthService);
    errorHandlerService = TestBed.get(ErrorHandlerService);
    mockRouter = TestBed.get(Router);
  });

  it('should save a history of navigation', async(() => {
    mockRouter.navigationEndSubject.next(new NavigationEnd(0, '/users', '/users/35/edit'));

    expect(errorHandlerService.previousUrl).toBe('/login');
    expect(errorHandlerService.hasPreviousUrl()).toBeTruthy();

    spyOn(mockRouter, 'navigateByUrl');
    errorHandlerService.goBack();

    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  }));

  it('should go to error page for an unauthorized role', async(() => {
    spyOn(mockRouter, 'navigate');

    errorHandlerService.unauthorizedRole();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['error/401']);
  }));

  it('should go to error page for an unauthorized user', async(() => {
    spyOn(mockRouter, 'navigate');
    spyOn(authService, 'logout');

    errorHandlerService.unauthorizedUser();

    expect(authService.logout).toHaveBeenCalled();
    expect(errorHandlerService.previousUrlToLogin).toBe('testingUrl');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  }));

  it('should go to error page for an unauthorized user with return url', async(() => {
    spyOn(mockRouter, 'navigate');
    spyOn(authService, 'logout');

    errorHandlerService.unauthorizedUser('users');

    expect(authService.logout).toHaveBeenCalled();
    expect(errorHandlerService.previousUrlToLogin).toBe('users');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  }));

  it('should go to error page for fatal errors', async(() => {
    spyOn(mockRouter, 'navigate');

    errorHandlerService.fatalError();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['error']);
  }));

  it('should get previuos url to login', async(() => {
    expect(errorHandlerService.hasPreviousUrlToLogin()).toBeFalsy();

    errorHandlerService.previousUrlToLogin = '/users';

    expect(errorHandlerService.hasPreviousUrlToLogin()).toBeTruthy();
  }));

  it('should go to correct page in 401 http status ', async(() => {
    spyOn(errorHandlerService, 'unauthorizedUser');

    errorHandlerService.http({status: '401'});

    expect(errorHandlerService.unauthorizedUser).toHaveBeenCalled();
  }));

  it('should go to correct page in 500 http status', async(() => {
    spyOn(errorHandlerService, 'fatalError');

    errorHandlerService.http({status: '500'});

    expect(errorHandlerService.fatalError).toHaveBeenCalled();
  }));

});
