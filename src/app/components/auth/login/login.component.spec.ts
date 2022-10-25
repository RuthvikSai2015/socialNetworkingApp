import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


describe('LoginComponent', () => {
  let loginComponent: LoginComponent;
  let http:HttpClient;
  let httpController: HttpTestingController;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule,
        RouterTestingModule]
    });
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    loginComponent.nameValid = "";
    loginComponent.passwordValid = ""; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('should not be empty username', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('#userName');
    const passwordInput: HTMLInputElement = hostElement.querySelector('#userPassword');
    const nameCheck: HTMLInputElement = hostElement.querySelector('#nameValidity');
    nameInput.value = '';
    passwordInput.value = 'Kulas Light'
    loginComponent.userName = nameInput.value;
    loginComponent.userPassword = passwordInput.value;
    loginComponent.onSubmit();
    expect(loginComponent.nameValid).toEqual("UserName cannot be empty")
  });

  it('should not be empty password', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('#userName');
    const passwordInput: HTMLInputElement = hostElement.querySelector('#userPassword');
    const nameCheck: HTMLInputElement = hostElement.querySelector('#nameValidity');
    nameInput.value = 'test';
    passwordInput.value = ''
    loginComponent.userName = nameInput.value;
    loginComponent.userPassword = passwordInput.value;
    loginComponent.onSubmit();
    expect(loginComponent.passwordValid).toEqual("Password cannot be empty")
  });

  // it('should log in a user', () => {
  //   const hostElement = fixture.nativeElement;
  //   const nameInput: HTMLInputElement = hostElement.querySelector('#userName');
  //   const passwordInput: HTMLInputElement = hostElement.querySelector('#userPassword');
  //   const nameCheck: HTMLInputElement = hostElement.querySelector('#nameValidity');
  //   const passwordCheck: HTMLInputElement = hostElement.querySelector('#passwordValidity');
  //   nameInput.value = "Bret";
  //   passwordInput.value = "Kulas Light";
  //   loginComponent.userName = nameInput.value;
  //   loginComponent.userPassword = passwordInput.value;

  //   loginComponent.onSubmit(); 
  //   expect(<string>localStorage.getItem('userName')).toEqual("Bret");
  //   expect(<string>localStorage.getItem('password')).toEqual("Kulas Light");
  //   let routerSpy = {navigate: jasmine.createSpy('navigate')};
  //   expect (routerSpy.navigate).not.toHaveBeenCalledWith(['main']);
   
    
  // });

  // it('should not log in an invalid user', () => {
  //   const hostElement = fixture.nativeElement;
  //   const nameInput: HTMLInputElement = hostElement.querySelector('#userName');
  //   const passwordInput: HTMLInputElement = hostElement.querySelector('#userPassword');
  //   const nameCheck: HTMLInputElement = hostElement.querySelector('#nameValidity');
  //   nameInput.value = "BadInput";
  //   passwordInput.value = "111";
  //   loginComponent.onSubmit();
  //   expect(loginComponent.loginFlag).toEqual(false);
  //   //expect(loginComponent.loginFailInfo).toEqual("The input data do not match to our user database, try again!")
  // });



});
