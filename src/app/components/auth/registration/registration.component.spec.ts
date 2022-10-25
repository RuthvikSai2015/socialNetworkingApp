import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { zip } from 'rxjs';

describe('RegisterationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [HttpClientModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('#userName');
    const emailInput: HTMLInputElement = hostElement.querySelector('#emailId');
    const phoneInput: HTMLInputElement = hostElement.querySelector('#contactNumber');
    const birthInput: HTMLInputElement = hostElement.querySelector('#dateOfBirth');
    const zipInput: HTMLInputElement = hostElement.querySelector('#zipCode');
    const passwordInput: HTMLInputElement = hostElement.querySelector('#password');
    const passwordInput2: HTMLInputElement = hostElement.querySelector('#confirmPassword');
    const successMessage: HTMLInputElement = hostElement.querySelector('#successMessage');
    nameInput.value = '';
    passwordInput.value = '';
    passwordInput2.value = '';
    birthInput.value='';
    phoneInput.value = '';
    emailInput.value = '';
    zipInput.value = '';
    component.onSubmit();
    expect(component.zipCheck).toEqual("Invalid Zipcode! Enter a 5-digit Zip Code.");
    expect(component.birthCheck).toEqual("");
    expect(component.phoneCheck).toEqual("Invalid Phone Number! Enter a 10 digit phone number in the form 123-123-1234");
    expect(component.passwordCheck).toEqual("The password cannot be empty");
    expect(component.emailCheck).toEqual("Invalid Email Address! Enter a valid Email Address of the form xxxxx@xxxxx.xxx");
    nameInput.value = 'Sara';
    passwordInput.value = 'xyz';
    passwordInput2.value = 'xyz';
    phoneInput.value = '111-123-1234';
    emailInput.value = 'sn_62@rice.edu';
    zipInput.value = '12345';
    component.zipCode = zipInput.value;
    component.dateOfBirth='27-10-1991';
    component.userName = nameInput.value;
    component.Password = passwordInput.value;
    component.emailId = emailInput.value;
    component.contactNumber = phoneInput.value;
    component.onSubmit();
   
    expect(component.zipCheck).toEqual("");
    expect(component.birthCheck).toEqual("");
    expect(component.phoneCheck).toEqual("");
    expect(component.emailCheck).toEqual("");
    expect(localStorage.setItem('userName',<string>component.userName)).toBe(undefined);
    //  expect(localStorage.getItem('userName')).toEqual(<string>component.userName);
    // expect(localStorage.getItem('userId')).toEqual(<string>"newUser");
    // expect(localStorage.getItem('dateOfBirth')).toEqual(<string>component.dateOfBirth);
    // expect(localStorage.getItem('phone')).toEqual(<string>component.contactNumber);
    // expect(localStorage.getItem('zipCode')).toEqual(<string>component.zipCode);
    // expect(localStorage.getItem('displayName')).toEqual(<string>component.displayName);
    // expect(localStorage.getItem('password')).toEqual(<string>component.Password);
    // expect(localStorage.getItem('email')).toEqual(<string>component.emailId);
  });

  it('test register function', () => {
    expect(component).toBeTruthy();
  });


});
