import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { url } from '../../../../environments/environment'

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
  //public dummyUser: Observable<User[]>;
  loginFlag: boolean;

  constructor(private http: HttpClient,
    private router: Router
  ) {
    this.userName = "";
    this.userPassword = "";
    this.nameValid = "";
    this.passwordValid = "";
    // this.dummyUser = this.userService.getDummyUsers();
    this.loginFlag = false;
    this.url = url;
  }


  ngOnInit(): void {
  }
  redirectRegister() {
    this.router.navigate(['register']);
  }
  async onSubmit() {
    if (!this.userName) {
      this.nameValid = "Username cannot be empty";
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

        var  LoginForm = {
          "username": this.userName,
          "password": this.userPassword
        }
        localStorage.setItem("userLoginForm", JSON.stringify(LoginForm));
        await this.http.post(this.url + 'login', LoginForm, { withCredentials: true}).subscribe(response => {
          // @ts-ignore
          if (response["result"] === "success") {
            this.router.navigate(['main']);
            this.loginFlag = true;
            this.loginFailInfo = "";
          }
        })
      }
 
      this.loginFailInfo = "The user does not exist! Please register and try again!";
  }


  async validateUser() {
    let resp:boolean = false;
    if (this.nameValid == "" && this.passwordValid == "") {

      var  LoginForm = {
        "username": this.userName,
        "password": this.userPassword
      }
      localStorage.setItem("userLoginForm", JSON.stringify(LoginForm));
      this.http.post(this.url + '/login', LoginForm, { withCredentials: true}).subscribe(response => {
        // @ts-ignore
        if (response["result"] === "success") {
          console.log("username match");
          this.loginFlag = true;
          this.loginFailInfo = "";
          resp = true;
        }
      })
    }
    console.log("Resp:",resp);
    return resp;
  }
}
