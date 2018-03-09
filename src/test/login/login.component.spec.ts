import {AuthService} from '../../app/_auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ErrorHandlerService} from '../../app/_shared/error-handler.service';
import {LoginComponent} from '../../app/login/login.component';
import {Observable} from 'rxjs/Observable';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('Login', () => {
  let mockErrorHandlerService: MockErrorHandlerService;
  class MockErrorHandlerService {
    public previousUrlToLogin;
    public hasPreviousUrlToLogin = () => {};
  }

  let component: any;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AuthService, {provide: ErrorHandlerService, useClass: MockErrorHandlerService}]
    });

    mockErrorHandlerService = TestBed.get(ErrorHandlerService);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should go to default page after login', async(() => {
    spyOn(component.authService, 'logout');
    spyOn(component.authService, 'login').and.returnValue(Observable.of({}));

    spyOn(mockErrorHandlerService, 'hasPreviousUrlToLogin').and.returnValue(false);

    spyOn(component.router, 'navigate');

    component.login();

    expect(component.authService.logout).toHaveBeenCalled();
    expect(component.authService.login).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['users']);
  }));

  it('should go to previousUrlToLogin after login', async(() => {
    spyOn(component.authService, 'logout');
    spyOn(component.authService, 'login').and.returnValue(Observable.of({}));

    mockErrorHandlerService.previousUrlToLogin = 'users/21/edit';
    spyOn(mockErrorHandlerService, 'hasPreviousUrlToLogin').and.returnValue(true);

    spyOn(component.router, 'navigateByUrl');

    component.login();

    expect(component.authService.logout).toHaveBeenCalled();
    expect(component.authService.login).toHaveBeenCalled();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('users/21/edit');
  }));

});
