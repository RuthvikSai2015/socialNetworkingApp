import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import { DataService} from "../../../services/data.service";
import {UserService} from "../../../services/user.service";
import { PostService} from "../../../services/post.service"
import { FollowerService} from "../../../services/follower.service";
import { Observable} from "rxjs";

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
  public dummyUser: any[] = [];

  constructor(    private http: HttpClient,
                  private router: Router,
                  private dataTransmit: DataService,
                  private userTransmit: UserService,
                  private postTransmit: PostService,
                  private followerService: FollowerService) {
                    this.userName="";
                    this.userPassword="";
      this.nameValid = "";
      this.passwordValid = "";
      this.url = "";  
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

    if (this.nameValid == "" && this.passwordValid=="") {
     var  LoginForm = {
        "username": this.userName,
        "password": this.userPassword
      }
      localStorage.setItem("userLoginForm", JSON.stringify(LoginForm));
      this.router.navigate(['main']);
    
    }
    this.loginFailInfo = "The input data do not match to our user database, try again!"
    }


  }
