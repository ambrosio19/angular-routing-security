import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserEditComponent} from '../../app/users/user-edit.component';
import {DialogModule} from 'primeng/dialog';
import {ActivatedRoute} from '@angular/router';

describe('UserEdit', () => {
  let component: any;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DialogModule],
      providers: [
        { provide: ActivatedRoute,
          useValue: {parent: {snapshot: {url: ['root', 'users', 'parent']}}}
        }
      ]
    });

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
  });

  it('should go to edit user page', async(() => {
    spyOn(component.router, 'navigate');

    component.closeDialog();

    expect(component.router.navigate).toHaveBeenCalledWith(['/root/users/parent']);
  }));

});
