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
  displayName : string | undefined
  emailId: string | undefined
  contactNumber: string | undefined
  dateOfBirth: string | undefined
  zipCode: string | undefined
  Password: string | undefined
  confirmPassword: string | undefined
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
      this.nameCheck = "Please enter a value that is aplhanumeric";

    if (this.userName && resultName)
      this.nameCheck = "";
    if (typeof this.emailId === "string")
      resultEmail = emailPattern.test(this.emailId);
    if (!resultEmail)
      this.emailCheck = "Invalid Email Address! Enter a valid Email Address of the form xxxxx@xxxxx.xxx";
    if (this.emailId && resultEmail)
      this.emailCheck = "";
    if (typeof this.zipCode === "string")
      resultZIP = zipPattern.test(this.zipCode);
    if (!resultZIP)
      this.zipCheck = "Invalid Zipcode! Enter a 5-digit Zip Code.";
    if ((<HTMLInputElement>document.getElementById("loginZip")).value.length != 5)
      this.zipCheck = "Invalid Zipcode! Enter a 5-digit Zip Code.";
    if (this.zipCode && resultZIP && this.zipCode.length == 5)
      this.zipCheck = "";
    if (typeof this.contactNumber === "string")
      resultPhone = phonePattern.test(this.contactNumber);
    if (!resultPhone)
      this.phoneCheck = "Invalid Phone Number! Enter a 10 digit phone number in the form 123-123-1234";
    if (this.contactNumber && resultPhone)
      this.phoneCheck = "";
    if ((<HTMLInputElement>document.getElementById("loginPassword")).value.length == 0)
      this.passwordCheck = "The password cannot be empty";
    else if (this.Password == this.confirmPassword)
      this.passwordCheck="";
    else
      this.passwordCheck = "Passwords do not match!";
    if (this.birthCheck == "" &&
      this.nameCheck == "" &&
      this.emailCheck == "" &&
      this.zipCheck == "" &&
      this.phoneCheck == "" &&
      this.passwordCheck=="") {
      var userInfoKey = "user:" + this.userName + ":" + this.Password;
      var data = {
        "username": this.userName,
        "displayName": this.displayName,
        "password": this.Password,
        "phone": this.contactNumber,
        "ZIP": this.zipCode,
        "DOB": this.dateOfBirth,
        "email": this.emailId,
        "userId": 11,
        "userHeadLine": "I am happy!"
      }
      if (data.displayName == null)
        data.displayName = "undefined";
      if (data.DOB == null)
        data.DOB = "0000-00-00";
      var data2 = {
        "username": this.userName,
        "email": this.emailId,
        "dob": this.dateOfBirth,
        "zipcode": this.zipCode,
        "password": this.Password,
        "displayName": this.displayName,
        "phone": this.contactNumber
      }
      this.successMessage="User Added Succesfully!";
      localStorage.setItem('userName',<string>this.userName);
      localStorage.setItem('dateOfBirth',<string>this.dateOfBirth);
      localStorage.setItem('phone',<string>this.contactNumber);
      localStorage.setItem('ZIP',<string>this.zipCode);
      localStorage.setItem('displayName',<string>this.displayName);
      localStorage.setItem('password',<string>this.Password);
      localStorage.setItem('email',<string>this.emailId);
    }
  }
}
