import {AuthService} from '../../app/_auth/auth.service';
import {async, TestBed} from '@angular/core/testing';
import {AuthInitializer} from '../../app/_auth/auth.initializer';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

describe('AuthInitializer', () => {
  let mockAuthService: MockAuthService;
  class MockAuthService {
    public initCurrentUser = false;

    public initCurrentUserFromStorage = () => {
      this.initCurrentUser = true;
      return Observable.empty();
    }
  }

  it('should initialize current user when application start', async(() => {
    TestBed.configureTestingModule({
      providers: [AuthInitializer, {provide: AuthService, useClass: MockAuthService}]
    });

    mockAuthService = TestBed.get(AuthService);

    expect(mockAuthService.initCurrentUser).toBeTruthy();
  }));

});
