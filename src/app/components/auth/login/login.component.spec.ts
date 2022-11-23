import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports:[HttpClientModule,RouterTestingModule],
      providers: [HttpClient,{provide:Router,useValue:routerSpy }]
    })
      .compileComponents();


     
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should log in a user', async () => {
    component.loginFlag = false;
    component.userName = "Bret";
    component.userPassword = "Kulas Light";
    
    let result = await component.validateUser();  
    await fixture.whenStable();   
    expect(result).toEqual(true);
    //expect(component.loginFlag).toBeTruthy();
  });

  it('should not log in an invalid user',async()=>{
    component.loginFlag = false;
    component.userName = "Sara";
    component.userPassword = "Kulas Light";
    let result = await component.validateUser();
    await fixture.whenStable();   
    expect(result).toBeFalsy();
  });

  it('should redirect logged in user',()=>{
    component.userName = "Bret";
    component.userPassword = "Kulas Light";

    let lFlag1 = component.loginFlag;
    component.onSubmit();
    let lFlag2 = component.loginFlag;
    expect(lFlag1).toBeFalse();
    expect(lFlag2).toBeTrue();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['main']);
  })

  it('should redirect new user to register',()=>{
    component.redirectRegister();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['register']);
  })

});
