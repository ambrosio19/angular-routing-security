import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserComponent} from '../../app/users/user.component';
import {ShowWithRolesDirective} from '../../app/_auth/utils/show-with-roles.directive';
import {AuthService} from '../../app/_auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('Users', () => {
  let component: any;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent, ShowWithRolesDirective],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AuthService]
    });

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should go to edit user page', async(() => {
    spyOn(component.router, 'navigate');

    component.edit(35);

    expect(component.router.navigate).toHaveBeenCalledWith(['/users/35/edit']);
  }));

});
