import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { test, User } from 'src/app/common/user';
import { Observable } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  url: string
  nameValid: any;
  userPassword: string | undefined;
  userName: any;
  passwordValid: string | undefined;
  loginFailInfo: any;
  public dummyUser: Observable<User[]>;
  loginFlag: boolean;

  constructor(private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.userName = "";
    this.userPassword = "";
    this.nameValid = "";
    this.passwordValid = "";
    this.dummyUser = this.userService.getDummyUsers();
    this.loginFlag = false;
    this.url = "https://jsonplaceholder.typicode.com/users";
  }


  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.userName) {
      this.nameValid = "UserName cannot be empty";
      return;
    }
    else
      this.nameValid = "";
    if (!this.userPassword) {
      this.passwordValid = "Password cannot be empty";
      return;
    }
    else
      this.passwordValid = "";

    if (this.nameValid == "" && this.passwordValid == "") {
      console.log(this.dummyUser);
      this.http.get(this.url, { withCredentials: true }).subscribe(response => {
        for (let data in response) {
          // @ts-ignore
          if (this.userName.trim() == response[data].username && this.userPassword == response[data]["address"].street) {
            console.log("username match");
            // @ts-ignore
            localStorage.setItem("userId", response[data].id);
            localStorage.setItem('userName', <string>this.userName);
            localStorage.setItem('password', <string>this.userPassword);
            this.loginFlag = true;
            this.loginFailInfo ="";
            this.router.navigate(['main']);
          }
        }
      })
      if (this.userName.trim() == <string>localStorage.getItem("userName") && this.userPassword == <string>localStorage.getItem("password")) {
        console.log("newUser");
        this.loginFlag = true;
        this.loginFailInfo ="";
        this.router.navigate(['main']);
      }
    }
    this.loginFailInfo = "The input data do not match to our user database, try again!";
  }
}
