import {AuthService} from '../../app/_auth/auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {ErrorHandlerService} from '../../app/_errors/error-handler.service';
import {AuthInterceptor} from '../../app/_auth/auth.interceptor';
import {Observable} from 'rxjs/Observable';

describe('AuthInterceptor', () => {
  let mockErrorHandlerService: MockErrorHandlerService;
  class MockErrorHandlerService {
    public unauthorizedRole = () => {};
    public unauthorizedUser = () => {};
  }

  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, AuthInterceptor, {provide: ErrorHandlerService, useClass: MockErrorHandlerService}]
    });

    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    mockErrorHandlerService = TestBed.get(ErrorHandlerService);
  });

  it('should define the headers', async(() => {
    spyOn(authService, 'getUserToken').and.returnValue('token');

    authService.fetchCallAPI().subscribe();

    const dataRequest = httpMock.expectOne('/api/data');
    dataRequest.flush({});


    expect(dataRequest.request.headers.has('Content-Type'));
    expect(dataRequest.request.headers.get('Content-Type')).toBe('application/json;Charset=UTF-8');

    expect(dataRequest.request.headers.has('Authorization'));
    expect(dataRequest.request.headers.get('Authorization')).toBe('Bearer token');
  }));

  it('should not define the authorization header with token null', async(() => {
    spyOn(authService, 'getUserToken').and.returnValue(null);

    authService.fetchCallAPI().subscribe();

    const dataRequest = httpMock.expectOne('/api/data');
    dataRequest.flush({});

    expect(dataRequest.request.headers.has('Content-Type'));
    expect(dataRequest.request.headers.get('Content-Type')).toBe('application/json;Charset=UTF-8');

    expect(dataRequest.request.headers.has('Authorization')).toBeFalsy();
  }));

  it('should refresh token only one time when status is 401', async(() => {
    spyOn(authService, 'getUserToken').and.returnValue('token');
    spyOn(authService, 'refreshToken').and.returnValue(Observable.of({}).delay(500));

    authService.initCurrentUserFromStorage().subscribe();
    authService.fetchCallAPI().subscribe();

    const meRequest = httpMock.expectOne('/api/me');
    meRequest.flush(null, {status: 401, statusText: 'Unauthorized'});

    const dataRequest = httpMock.expectOne('/api/data');
    dataRequest.flush(null, {status: 401, statusText: 'Unauthorized'});


    expect(authService.refreshToken).toHaveBeenCalledTimes(1);
  }));

  it('should not refresh token and return 401', async(() => {
    spyOn(authService, 'getUserToken').and.returnValue('token');
    spyOn(authService, 'refreshToken').and.returnValue(Observable.throw(new Error()));

    authService.fetchCallAPI().subscribe(() => {}, (error) => {
      expect(error.status).toBe(401);
    });

    const dataRequest = httpMock.expectOne('/api/data');
    dataRequest.flush(null, {status: 401, statusText: 'Unauthorized'});


    expect(authService.refreshToken).toHaveBeenCalled();
  }));

  it('should return current error when status is different to 401', async(() => {
    spyOn(authService, 'getUserToken').and.returnValue('token');
    spyOn(authService, 'refreshToken').and.returnValue(Observable.throw(new Error()));

    authService.fetchCallAPI().subscribe(() => {}, (error) => {
      expect(error.status).toBe(500);
    });

    const dataRequest = httpMock.expectOne('/api/data');
    dataRequest.flush(null, {status: 500, statusText: 'Unauthorized'});


    expect(authService.refreshToken).toHaveBeenCalledTimes(0);
  }));


});
