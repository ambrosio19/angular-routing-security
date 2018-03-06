import {AuthService} from '../../app/_auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LayoutComponent} from '../../app/layout/layout.component';
import {Constants} from '../../app/app.constants';
import {Observable} from 'rxjs/Observable';

describe('Layout', () => {
  let component: any;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AuthService]
    });

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
  });

  it('should logout and go to root', async(() => {

    spyOn(component.authService, 'logout');

    spyOn(component.router, 'navigate');

    component.logout();

    expect(component.authService.logout).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should revoke token', async(() => {
    localStorage.setItem(Constants.localStorage.user, JSON.stringify({token: 'token', refreshToken: 'refreshToken'}));

    component.revokeToken();

    const userStorage = JSON.parse(localStorage.getItem(Constants.localStorage.user));
    expect(userStorage.token).toBe('revokeToken');
  }));

  it('should revoke token', async(() => {
    localStorage.setItem(Constants.localStorage.user, JSON.stringify({token: 'token', refreshToken: 'refreshToken'}));

    component.revokeRefreshToken();

    const userStorage = JSON.parse(localStorage.getItem(Constants.localStorage.user));
    expect(userStorage.refreshToken).toBe('revokeRefreshToken');
  }));

  it('should call to get data', async(() => {
    spyOn(component.authService, 'fetchCallAPI').and.returnValue(Observable.of({}));

    component.fetchData();

    expect(component.authService.fetchCallAPI).toHaveBeenCalled();
  }));

});
