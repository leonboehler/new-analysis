import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give an error on invalid credentials (TK-0220a; FBT02)', () => {
    spyOn(window, 'alert');
    const element: HTMLElement = fixture.nativeElement;
    (<HTMLInputElement> element.querySelector('#login_username')).value = 'h4ck3r';
    (<HTMLInputElement> element.querySelector('#login_password')).value = 'SuP3R_S3CuR3'

    component.onClickLogin();

    expect(window.alert).toHaveBeenCalled();
  });
});
