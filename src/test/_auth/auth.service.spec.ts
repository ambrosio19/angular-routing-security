import {AuthService} from '../../app/_auth/auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach( () => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should initialize current user like null', async(() => {
    expect(authService.getUserToken()).toBeNull();

    authService.initCurrentUserFromStorage().subscribe(() => {
      expect(authService.getCurrentUser().isLogged()).toBe(false);
    });
  }));

  it('should logged the current user', async(() => {
    authService.login('admin', 'blas').subscribe(() => {
      expect(authService.getCurrentUser().isLogged()).toBe(true);
    });

    loginHttpMock();
  }));

  it('should logout the current user', async(() => {
    authService.login('admin', 'blas').subscribe(() => {
      authService.logout();
      expect(authService.getCurrentUser().isLogged()).toBe(false);
    });

    loginHttpMock();
  }));

  it('should get information from current user', async(() => {
    expect(authService.getCurrentUser().isLogged()).toBeFalsy();
    expect(authService.getCurrentUser().hasAnyRoles(['ROLE_ADMIN', 'ROLE_TEST'])).toBeFalsy();
    expect(authService.getCurrentUser().hasRoles(['ROLE_ADMIN'])).toBeFalsy();

    authService.login('admin', 'blas').subscribe(() => {
      expect(authService.getCurrentUser()).toBeDefined();
      expect(authService.getCurrentUser().isLogged()).toBeTruthy();
      expect(authService.getCurrentUser().hasAnyRoles(['ROLE_ADMIN', 'ROLE_TEST'])).toBeTruthy();
      expect(authService.getCurrentUser().hasAnyRoles(['ROLE_TEST'])).toBeFalsy();
      expect(authService.getCurrentUser().hasRoles(['ROLE_ADMIN', 'ROLE_TEST'])).toBeFalsy();
      expect(authService.getCurrentUser().hasRoles(['ROLE_ADMIN'])).toBeTruthy();
      expect(authService.getCurrentUser().user.name).toBe('Jhon Doe');
    });

    loginHttpMock();
  }));

  it('should get token from current user', async(() => {
    authService.login('admin', 'blas').subscribe(() => {
      expect(authService.getUserToken()).toBe('token');
    });

    loginHttpMock();
  }));

  it('should refresh token for current user', async(() => {
    authService.login('admin', 'blas').subscribe(() => {
      authService.refreshToken().subscribe(() => {
        expect(authService.getUserToken()).toBe('token2');
      });
    });

    loginHttpMock();

    const refreshTokenRequest = httpMock.expectOne('/api/refreshToken');
    refreshTokenRequest.flush({token: 'token2', refreshToken: 'refreshToken2'});
  }));

  function loginHttpMock() {
    const loginRequest = httpMock.expectOne('/api/token');
    loginRequest.flush({token: 'token', refreshToken: 'refreshToken'});

    const meRequest = httpMock.expectOne('/api/me');
    meRequest.flush({name: 'Jhon Doe',
      email: `jhon-doe@test`,
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
      imageUrl: 'https://image.jpg'});
  }

});
