import {AuthService} from '../../../app/_auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {ShowWithRolesDirective} from '../../../app/_auth/utils/show-with-roles.directive';
import {ShowWithAnyRolesDirective} from '../../../app/_auth/utils/show-with-any-roles.directive';

@Component({
  template: `<span *appShowWithAnyRoles="['ROLE_ADMIN', 'ROLE_TEST']">Hello World</span>`
})
class TestLayoutComponent { }

describe('AuthUtils', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowWithAnyRolesDirective, TestLayoutComponent],
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

    authService.setCurrentUser({name: 'Jhon Doe',
      email: `jhon-doe@test`,
      roles: ['ROLE_USER'],
      imageUrl: 'https://image.jpg'});

    fixture.detectChanges();

    expect(element.children.length).toBe(0);

    authService.logout();

    fixture.detectChanges();

    expect(element.children.length).toBe(0);
  }));


});
