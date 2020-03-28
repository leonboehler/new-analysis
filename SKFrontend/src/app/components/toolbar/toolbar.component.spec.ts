import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing'
import { Router } from '@angular/router'

import { ToolbarComponent } from './toolbar.component';
import { CommunicationService } from 'src/app/services/communication.service';
import { CommunicationServiceMock } from 'src/app/services/communication.service.mock';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  let communicationService: CommunicationServiceMock;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    communicationService = new CommunicationServiceMock();

    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: CommunicationService, useValue: communicationService },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate away if server allows logout (TK-0221a; FBT03)', () => {
    component.onLogout();
    expect(communicationService.logouts).toBe(1);
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should stay if server disallows logout', () => {
    communicationService.allowLogout = false;
    component.onLogout();
    expect(communicationService.logouts).toBe(1);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
