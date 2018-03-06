import {AuthService} from '../../app/_auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from '../../app/home/home.component';

describe('Home', () => {
  let component: any;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });


    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should go to default page after login', async(() => {
    spyOn(component.authService, 'logout');

    component.logout();

    expect(component.authService.logout).toHaveBeenCalled();
  }));

});
