import {AuthService} from '../app/_auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from '../app/app.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('App', () => {
  let component: any;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

    it('should have present the current user', async(() => {
    expect(component.currentUser).toBeDefined();
  }));

});
