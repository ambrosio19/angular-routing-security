import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {ErrorHandlerService} from '../../app/_errors/error-handler.service';
import {ErrorComponent} from '../../app/errors/error.component';

describe('Error', () => {
  let component: any;
  let fixture: ComponentFixture<ErrorComponent>;

  let mockErrorHandlerService: MockErrorHandlerService;
  class MockErrorHandlerService {
    public hasPreviousUrl = () => {};
    public goBack = () => {};
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      imports: [],
      providers: [
        { provide: ActivatedRoute,
          useValue: {snapshot: {params: {type: '401'}}}
        },
        {provide: ErrorHandlerService, useClass: MockErrorHandlerService}
      ]
    });

    mockErrorHandlerService = TestBed.get(ErrorHandlerService);

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the correct image', async(() => {
    expect(component.imageType).toBe('401');
  }));

  it('should can go to back', async(() => {
    spyOn(mockErrorHandlerService, 'hasPreviousUrl').and.returnValue(true);

    expect(component.canGoBack()).toBeTruthy();
  }));

  it('should can not go to back', async(() => {
    spyOn(mockErrorHandlerService, 'hasPreviousUrl').and.returnValue(false);

    expect(component.canGoBack()).toBeFalsy();
  }));

  it('should can not go to back', async(() => {
    spyOn(mockErrorHandlerService, 'goBack').and.returnValue(null);

    component.goBack();

    expect(mockErrorHandlerService.goBack).toHaveBeenCalled();
  }));

});
