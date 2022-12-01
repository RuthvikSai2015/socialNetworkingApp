import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from 'rxjs';
import { url } from '../../../common/env';

@Component({
  selector: 'app-registeration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  url: string;

  nameCheck: any = "";
  emailCheck: any = "";
  phoneCheck: any = "";
  birthCheck: any = "";
  zipCheck: any = "";
  passwordCheck: any = "";
  userName: string | undefined;
  displayName: string | undefined
  emailId: string | undefined
  contactNumber: string | undefined
  dateOfBirth: string | undefined
  zipCode: string | undefined
  Password: string | undefined
  confirmPassword: string | undefined
  successMessage: string = "";
  public dummyUser: any[] = [];

  constructor(private http: HttpClient,
    private router: Router) {
    this.url = url;
  }

  ngOnInit(): void {
  }
  redirectToLogin() {
    this.router.navigate(['login']);
  }
  async onSubmit() {
    debugger;
    let response$ = this.http.get(this.url, { withCredentials: true });
    let response: any = await lastValueFrom(response$);
    for (let data in response) {
      this.dummyUser.push(response[data].username);
    }

    const found = this.dummyUser.find(x => { return x == this.userName });
    if (found == undefined) {


      var namePattern = new RegExp("^[A-Za-z]\\w{3,29}$");
      var emailPattern = new RegExp(".@.")
      var zipPattern = new RegExp("[0-9]{5}")
      var phonePattern = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}")
      var resultName;
      var resultEmail;
      var resultZIP;
      var resultPhone;
      var today = new Date();
      var now = today.getTime();
      var dob = document.getElementById("dateOfBirth");
      var ymd = (<HTMLInputElement>dob).value.split("-");
      var dobyear = parseInt(ymd[0]) + 18;
      var dobmonth = parseInt(ymd[1], 10);
      var dobday = parseInt(ymd[2], 10);
      var userDob = new Date();
      userDob.setFullYear(dobyear, dobmonth - 1, dobday);
      if (typeof this.dateOfBirth === "string") {
        this.birthCheck = "Please enter date of birth!";
      }

      if (userDob.getTime() > now) {
        this.birthCheck = "User must be older than 18 years!";
      }
      else {
        this.birthCheck = "";
      }
      if (typeof this.userName === "string")
        resultName = namePattern.test(this.userName);
      if (!resultName)
        this.nameCheck = "Username must not start with a digit and cannot contain spaces!";

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
      if ((<HTMLInputElement>document.getElementById("zipCode")).value.length != 5)
        this.zipCheck = "Invalid Zipcode! Enter a 5-digit Zip Code.";
      if (this.zipCode && resultZIP && this.zipCode.length == 5)
        this.zipCheck = "";
      if (typeof this.contactNumber === "string")
        resultPhone = phonePattern.test(this.contactNumber);
      if (!resultPhone)
        this.phoneCheck = "Invalid Phone Number! Enter a 10 digit phone number in the form 123-123-1234";
      if (this.contactNumber && resultPhone)
        this.phoneCheck = "";
      if ((<HTMLInputElement>document.getElementById("password")).value.length == 0)
        this.passwordCheck = "The password cannot be empty";
      else if (this.Password == this.confirmPassword)
        this.passwordCheck = "";
      else
        this.passwordCheck = "Passwords do not match!";
      if (this.birthCheck == "" &&
        this.nameCheck == "" &&
        this.emailCheck == "" &&
        this.zipCheck == "" &&
        this.phoneCheck == "" &&
        this.passwordCheck == "") {
        var registerData = {
          "username": this.userName,
          "email": this.emailId,
          "dob": this.dateOfBirth,
          "zipcode": this.zipCode,
          "password": this.Password,
          "displayName": this.displayName,
          "phone": this.contactNumber
        }
        this.http.post(this.url + 'register', registerData, { withCredentials: true }).subscribe(response => {
          // @ts-ignore
          if (response["result"] === "success") {
            this.successMessage = "User added successfully! Please proceed to login using the link below.";
          }
          // @ts-ignore
          if (response["result"] === "Username already exist") {
            this.nameCheck = "Username already exists! Please use a different username!";
          }
        })
      }
    } else {
      this.nameCheck = "Username already exists! Please use a different username!";
      return;
    }
  }
}
