import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let data = {
    "username": "Sara",
    "displayName": "",
    "password": "111",
    "phone": "111-123-12345",
    "ZIP": "12345",
    "DOB": "11/13/2000",
    "email": "sn_62@rice.edu",
    "userId": 1,
    "userHeadLine": "happy"
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [HttpClientModule,
        RouterTestingModule]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the users profile username', () => {
    const hostElement = fixture.nativeElement;
    component.ngOnInit();
    expect(<string>localStorage.getItem("userName")).toEqual("Sara");
  });

  it ('submit button should work', () => {
    // component.emailId = "xxx";
    // component.userName = "1";
    // component.onSubmitForm();
    // expect(component.emailCheck).toEqual("Invalid Email Address! Enter a valid Email Address of the form xxxxx@xxxxx.xxx");
    // expect(component.nameCheck).toEqual("Please enter a valid value that should not start with digit and min length is 6");
    component.userName = "Sara";
    component.emailId = "sn_62@rice.edu"
    component.onSubmitForm()
    expect(component.emailCheck).toEqual("");
    expect(component.nameCheck).toEqual("");
    component.birthCheck = ""
    component.nameCheck = ""
    component.emailCheck = ""
    component.zipCheck = ""
    component.phoneCheck = ""
    component.passwordCheck=""
    component.onSubmitForm();
    const hostElement = fixture.nativeElement;
    const passwordInput: HTMLInputElement = hostElement.querySelector('#password');
    const passwordInput2: HTMLInputElement = hostElement.querySelector('#confirmPassword');
    passwordInput.value = '1111';
    passwordInput2.value = '1111';
    component.contactNumber = "111-111-1111"
    component.zipCode = "77030"
    component.onSubmitForm();
    expect(component.phoneCheck).toEqual("");
    expect(component.zipCheck).toEqual("");
    expect(component.passwordCheck).toEqual("");
  })
});
