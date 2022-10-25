import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
// import {Router} from "@angular/router";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  // let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientModule,
        RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.userHeadLine = "This is User Head Line";
    expect(component).toBeTruthy();
  });
  it('should change head line for Logged in User', () => {
    component.userHeadLine = "This is User Head Line";
    component.inputNewStatus = "Offline";
    component.changeStatus();
    expect(<string>localStorage.getItem("userHeadLine")).toEqual("This is User Head Line");
  });
  it('should log out for current user', () => {
    component.userHeadLine = "This is User Head Line";
    component.inputNewStatus = "test";
    component.logOutHelper();
    expect(component.userName).toEqual("");
    expect(component.inputNewStatus).toEqual("");
    expect(component.userHeadLine).toEqual("");
  });


});
