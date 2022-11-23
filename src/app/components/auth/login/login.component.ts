import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { lastValueFrom } from 'rxjs';

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
    this.url = "https://jsonplaceholder.typicode.com/users";
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

   await this.validateUser();
    debugger;
    if (this.loginFlag == true) {
      this.router.navigate(['main']);
    }
    if (this.userName.trim() == <string>localStorage.getItem("userName") && this.userPassword == <string>localStorage.getItem("password")) {
      console.log("newUser");
      this.loginFlag = true;
      this.loginFailInfo = "";
      this.router.navigate(['main']);
    }
    if (!this.loginFlag) {
      this.loginFailInfo = "The user does not exist! Please register and try again!";
    }
  }


  async validateUser() {
    let resp:boolean = false;
    if (this.nameValid == "" && this.passwordValid == "") {

      let response$ = this.http.get(this.url, { withCredentials: true });
      let response:any = await lastValueFrom(response$);
      for(let data in response)
      {
        if (this.userName.trim() == response[data].username && this.userPassword == response[data]["address"].street && resp == false) {
          console.log("username match");
          localStorage.setItem("userId", response[data].id);
          localStorage.setItem('userName', <string>this.userName);
          localStorage.setItem('password', <string>this.userPassword);
          this.loginFlag = true;
          this.loginFailInfo = "";
          resp = true;
          break;
          //return resp;

        }
      }

      // this.http.get(this.url, { withCredentials: true }).subscribe(response => {
      //   for (let data in response) {
      //     // @ts-ignore
      //     if (this.userName.trim() == response[data].username && this.userPassword == response[data]["address"].street) {
      //       console.log("username match");
      //       // @ts-ignore
      //       localStorage.setItem("userId", response[data].id);
      //       localStorage.setItem('userName', <string>this.userName);
      //       localStorage.setItem('password', <string>this.userPassword);
      //       this.loginFlag = true;
      //       this.loginFailInfo = "";

      //     }
      //   }
      // });
    }
    console.log("Resp:",resp);
    return resp;
  }
}
