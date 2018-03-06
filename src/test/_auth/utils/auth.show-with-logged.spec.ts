import {AuthService} from '../../../app/_auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {ShowWithLoggedDirective} from '../../../app/_auth/utils/show-with-logged.directive';
import {Component} from '@angular/core';

@Component({
  template: `<span *appShowWithLogged>Hello World</span>`
})
class TestLayoutComponent { }

describe('AuthUtils', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowWithLoggedDirective, TestLayoutComponent],
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.get(AuthService);
  });

  it('should show and hide the directive when user changes', async(() => {
    const fixture = TestBed.createComponent(TestLayoutComponent);
    const element = fixture.nativeElement;

    expect(element.children.length).toBe(0);

    authService.setCurrentUser({name: 'Jhon Doe',
      email: `jhon-doe@test`,
      roles: ['ROLE_ADMIN'],
      imageUrl: 'https://image.jpg'});

    fixture.detectChanges();

    expect(fixture).toBeDefined();
    expect(element.children[0].innerHTML).toBe('Hello World');

    authService.logout();

    fixture.detectChanges();

    expect(element.children.length).toBe(0);
  }));


});
