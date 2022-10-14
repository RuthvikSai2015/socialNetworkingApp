import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-registeration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegisterationComponent implements OnInit {
  url: string
  nameCheck: any;
  emailCheck: any;
  phoneCheck: any;
  birthCheck: any;
  zipCheck: any;
  passwordCheck: any;
  userName: string | undefined;
  inputDisplayName : string | undefined
  inputEmail: string | undefined
  inputPhone: string | undefined
  inputBirth: string | undefined
  inputZIP: string | undefined
  inputPassword: string | undefined
  inputPassword2: string | undefined
  successMessage: string | undefined
  public dummyUser: any[] = [];

  constructor(private http: HttpClient,
              private router: Router) {
    this.nameCheck = "";
    this.emailCheck = "";
    this.birthCheck = "";
    this.zipCheck = "";
    this.phoneCheck = "";
    this.passwordCheck="";
    this.url = "";   
    this.successMessage="";
  }

  ngOnInit(): void {
  }

  onSubmit() {
    var namePattern = new RegExp("[a-zA-Z]+[a-zA-Z0-9]*");
    var emailPattern = new RegExp(".@.")
    var zipPattern = new RegExp("[0-9]{5}")
    var phonePattern = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}")
    var resultName;
    var resultEmail;
    var resultZIP;
    var resultPhone;
    var today = new Date();
    var now = today.getTime();
    var dob = document.getElementById("loginBirth")
    var ymd = (<HTMLInputElement>dob).value.split("-");
    var dobyear = parseInt(ymd[0]) + 18;
    var dobmonth = parseInt(ymd[1], 10);
    var dobday = parseInt(ymd[2], 10);
    var userDob = new Date();
    userDob.setFullYear(dobyear, dobmonth - 1, dobday);
    if (userDob.getTime() > now) {
      this.birthCheck = "User must older than 18 years old";
    }
    else {
      this.birthCheck = "";
    }
    if (typeof this.userName === "string")
      resultName = namePattern.test(this.userName);
    if (!resultName)
      this.nameCheck = "Expect proper format is a string of upper and lower case letters and numbers begin with a letter";

    if (this.userName && resultName)
      this.nameCheck = "";
    if (typeof this.inputEmail === "string")
      resultEmail = emailPattern.test(this.inputEmail);
    if (!resultEmail)
      this.emailCheck = "Expected email form should be include a @. Ex: sn_62@rice.edu";
    if (this.inputEmail && resultEmail)
      this.emailCheck = "";
    if (typeof this.inputZIP === "string")
      resultZIP = zipPattern.test(this.inputZIP);
    if (!resultZIP)
      this.zipCheck = "Expected zip should be 5 digit";
    if ((<HTMLInputElement>document.getElementById("loginZip")).value.length != 5)
      this.zipCheck = "Expected zip should be 5 digit";
    if (this.inputZIP && resultZIP && this.inputZIP.length == 5)
      this.zipCheck = "";
    if (typeof this.inputPhone === "string")
      resultPhone = phonePattern.test(this.inputPhone);
    if (!resultPhone)
      this.phoneCheck = "Expected phone number format 012-012-0123";
    if (this.inputPhone && resultPhone)
      this.phoneCheck = "";
    if ((<HTMLInputElement>document.getElementById("loginPassword")).value.length == 0)
      this.passwordCheck = "The password cannot be empty";
    else if (this.inputPassword == this.inputPassword2)
      this.passwordCheck="";
    else
      this.passwordCheck = "The password do not matched";
    if (this.birthCheck == "" &&
      this.nameCheck == "" &&
      this.emailCheck == "" &&
      this.zipCheck == "" &&
      this.phoneCheck == "" &&
      this.passwordCheck=="") {
      var userInfoKey = "user:" + this.userName + ":" + this.inputPassword;
      var data = {
        "username": this.userName,
        "displayName": this.inputDisplayName,
        "password": this.inputPassword,
        "phone": this.inputPhone,
        "ZIP": this.inputZIP,
        "DOB": this.inputBirth,
        "email": this.inputEmail,
        "userId": 11,
        "userHeadLine": "I am happy!"
      }
      if (data.displayName == null)
        data.displayName = "undefined";
      if (data.DOB == null)
        data.DOB = "0000-00-00";
      var data2 = {
        "username": this.userName,
        "email": this.inputEmail,
        "dob": this.inputBirth,
        "zipcode": this.inputZIP,
        "password": this.inputPassword,
        "displayName": this.inputDisplayName,
        "phone": this.inputPhone
      }
      this.successMessage="User Added Succesfully!";
      localStorage.setItem('userName',<string>this.userName);
      localStorage.setItem('dateOfBirth',<string>this.inputBirth);
      localStorage.setItem('phone',<string>this.inputPhone);
      localStorage.setItem('ZIP',<string>this.inputZIP);
      localStorage.setItem('displayName',<string>this.inputDisplayName);
      localStorage.setItem('password',<string>this.inputPassword);
      localStorage.setItem('email',<string>this.inputEmail);
    }
  }
}
