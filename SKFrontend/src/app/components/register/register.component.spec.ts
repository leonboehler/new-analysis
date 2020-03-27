import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Setup contact details
    element = fixture.nativeElement;
    (<HTMLInputElement> element.querySelector('#input_firstname')).value = 'Tommy';
    (<HTMLInputElement> element.querySelector('#input_name')).value = 'Testuser';
    (<HTMLInputElement> element.querySelector('#input_email')).value = 'tommy@testus.er';
    (<HTMLInputElement> element.querySelector('#input_birthday')).value = '1980-01-01';
    (<HTMLInputElement> element.querySelector('#input_telnumber')).value = '1234 5678';
    (<HTMLInputElement> element.querySelector('#input_password')).value = 'SuP3R_S3CuR3';
    (<HTMLInputElement> element.querySelector('#input_password_confirm')).value = 'SuP3R_S3CuR3';
    (<HTMLInputElement> element.querySelector('#input_street')).value = 'Teststreet';
    (<HTMLInputElement> element.querySelector('#input_streetNumber')).value = '123';
    (<HTMLInputElement> element.querySelector('#input_postcode')).value = '54321';
    (<HTMLInputElement> element.querySelector('#input_city')).value = 'Teston';
    (<HTMLInputElement> element.querySelector('#input_state')).value = 'Testshire';
    (<HTMLInputElement> element.querySelector('#input_country')).value = 'Testopia';
    (<HTMLInputElement> element.querySelector('#input_agb')).checked = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should catch no first name (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_firstname')).value = '';
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should catch no surname (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_name')).value = '';
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should catch invalid e-mail address (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_email')).value = 'WRONG!';
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should catch no city (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_city')).value = '';
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should catch no postcode (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_postcode')).value = '';
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should allow no street (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_street')).value = '';
    expect(component.onClickRegister()).not.toBeFalse();
  });

  it('should catch short password (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_password')).value = 'S#0rt';
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should catch no capitals in password (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_password')).value = 'l0wer_case';
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should catch only capitals in password (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_password')).value = 'UPP3R_CAS3';
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should catch no numbers in password (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_password')).value = 'Non_Numeric';
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should catch passwords don\'t match (FBB02)', () => {
    (<HTMLInputElement> element.querySelector('#input_password_confirm')).value += 'x';
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should catch unchecked terms of use (FBB07)', () => {
    (<HTMLInputElement> element.querySelector('#input_agb')).checked = false;
    expect(component.onClickRegister()).toBeFalse();
  });

  it('should accept valid details (FBB02)', () => {
    // Valid input was already set up in beforeEach()
    expect(component.onClickRegister()).not.toBeFalse();
  });
});
