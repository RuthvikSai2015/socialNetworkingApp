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
  nameCheck: any;
  inputPassword: string | undefined;
  inputName: any;
  passwordCheck: string | undefined;
  loginFailInfo: any;
  public dummyUser: any[] = [];

  constructor(    private http: HttpClient,
                  private router: Router,
                  private dataTransmit: DataService,
                  private userTransmit: UserService,
                  private postTransmit: PostService,
                  private followerService: FollowerService) {
      this.nameCheck = "";
      this.passwordCheck = "";
      this.url = "";  
   }


  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.inputName) this.nameCheck = "UserName cannot be empty";
    else
      this.nameCheck = "";
    if (!this.inputPassword) this.passwordCheck = "Password cannot be empty";
    else
      this.passwordCheck = "";

    if (this.nameCheck == "" && this.passwordCheck=="") {
     var  LoginForm = {
        "username": this.inputName,
        "password": this.inputPassword
      }
      localStorage.setItem("userLoginForm", JSON.stringify(LoginForm));
          this.router.navigate(['main']);
    
    }
    this.loginFailInfo = "The input data do not match to our user database, try again!"
    }


  }
