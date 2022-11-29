import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { url } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  url: string
  nameCheck: any;
  emailCheck: any;
  phoneCheck: any;
  birthCheck: any;
  zipCheck: any;
  passwordCheck: any;
  userName: string | undefined;
  displayName: string | undefined
  displayNameForm: string | undefined;
  emailId: string | undefined
  contactNumber: string | undefined
  dateOfBirth: string | undefined
  zipCode: string | undefined
  Password: string | undefined
  confirmPassword: string | undefined
  phone: any;
  email: any;
  dateOfBirthDisplay: any;
  contactNumberDisplay: any;
  userNameDisplay: any;
  userNameDisplay2: any;
  zipDisplay: any;
  img: File | undefined;
  imgUrl: string | undefined;
  successMessage: string | undefined;
  constructor(private http: HttpClient, private router: Router) {
    this.url = url;
    this.nameCheck = "";
    this.emailCheck = "";
    this.birthCheck = "";
    this.zipCheck = "";
    this.phoneCheck = "";
    this.passwordCheck = "";
    this.successMessage = "";
    this.userName = "";
    this.displayNameForm = "";
  }
  async ngOnInit(): Promise<void> {
    this.http.get(this.url + 'username/', { withCredentials: true }).subscribe(res => {
      // @ts-ignore
      this.userNameDisplay = res["username"];
    })
    this.http.get(this.url + 'email/', { withCredentials: true }).subscribe(res => {
      // @ts-ignore
      this.email = res["email"];
    })
    this.http.get(this.url + 'dob/', { withCredentials: true }).subscribe(res => {
      // @ts-ignore
      this.dateOfBirthDisplay = res["dob"];
    })
    this.http.get(this.url + 'zipcode/', { withCredentials: true }).subscribe(res => {
      // @ts-ignore
      this.zipDisplay = res["zipcode"];
    })
    this.http.get(this.url + 'phone/', { withCredentials: true }).subscribe(res => {
      // @ts-ignore
      this.contactNumberDisplay = res["phone"];
    })
    this.http.get(this.url + 'displayName/', { withCredentials: true }).subscribe(res => {
      // @ts-ignore
      this.displayNameForm = res["displayName"];
    })
    this.http.get(this.url + 'avatar/', { withCredentials: true }).subscribe(res => {
      // @ts-ignore
      this.imgUrl = res["avatar"];
    })
  }
  uploadImage() {
    // @ts-ignore
    let file = (<HTMLInputElement>document.getElementById("newImage")).files[0];
    if (file) {
      const fd = new FormData();
      fd.append('image', file);
      this.http.put(this.url + 'url', fd, { withCredentials: true }).subscribe(res => {
        // @ts-ignore
        this.imgUrl = res["url"];
        this.http.put(this.url + 'avatar', { avatar: this.imgUrl }, { withCredentials: true }).subscribe(response => {
          // @ts-ignore
          this.imgUrl = response["avatar"];
        })

      })
    }
  }
  onSubmit() {
    this.router.navigate(['main']);
  }
  doRedirection() {
    this.router.navigate(['profile']);
  }
  onSubmit2() {
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
      this.birthCheck = "Please enter date of birth";
    }

    if (userDob.getTime() > now) {
      this.birthCheck = "User must be older than 18 years!";
    }
    else {
      this.birthCheck = "";
    }

    if (this.userName && this.userName != '') {
      resultName = namePattern.test(this.userName);
      if (!resultName)
        this.nameCheck = "Username must not start with a digit and cannot contain spaces!";
    }



    if (this.userName && resultName && this.userName != "")
      this.nameCheck = "";
    if (this.emailId) {
      resultEmail = emailPattern.test(this.emailId);
      if (!resultEmail)
        this.emailCheck = "Invalid Email Address! Enter a valid Email Address of the form xxxxx@xxxxx.xxx";
    }
    if (this.emailId && resultEmail)
      this.emailCheck = "";
    if (this.zipCode) {
      resultZIP = zipPattern.test(this.zipCode);
      if (!resultZIP)
        this.zipCheck = "Invalid Zipcode! Enter a 5-digit Zip Code.";
      if ((<HTMLInputElement>document.getElementById("zipCode")).value.length != 5)
        this.zipCheck = "Invalid Zipcode! Enter a 5-digit Zip Code.";
    }

    if (this.zipCode && resultZIP && this.zipCode.length == 5)
      this.zipCheck = "";
    if (this.zipCode && resultZIP && this.zipCode.length == 5)
      this.zipCheck = "";
    if (this.contactNumber) {
      resultPhone = phonePattern.test(this.contactNumber);
      if (!resultPhone)
        this.phoneCheck = "Invalid Phone Number! Enter a 10 digit phone number in the form 123-123-1234";
    }

    if (this.contactNumber && resultPhone)
      this.phoneCheck = "";
    if (this.Password && this.Password != '') {
      if ((<HTMLInputElement>document.getElementById("password")).value.length == 0)
        this.passwordCheck = "The password cannot be empty";
      else if (this.Password == this.confirmPassword)
        this.passwordCheck = "";
      else
        this.passwordCheck = "Passwords do not match!";
    }

    if (this.birthCheck == "" &&
      this.nameCheck == "" &&
      this.emailCheck == "" &&
      this.zipCheck == "" &&
      this.phoneCheck == "" &&
      this.passwordCheck == "") {

      let data = {};
      if (this.displayName != null) {
        data = { "displayName": this.displayName }
        this.http.put(this.url + 'displayName', data, { withCredentials: true }).subscribe(response => {
          this.successMessage = "User Details Updated Successfully!";
          // @ts-ignore
          this.displayNameForm = response["displayName"];
        })
      }
      if (this.emailId != null) {
        data = { "email": this.emailId };
        this.http.put(this.url + 'email', data, { withCredentials: true }).subscribe(response => {
          this.successMessage = "User Details Updated Successfully!";
          // @ts-ignore
          this.email = response["email"];
        })
      }
      if (this.zipCode != null) {
        data = { "zipcode": this.zipCode };
        this.http.put(this.url + 'zipcode', data, { withCredentials: true }).subscribe(response => {
          this.successMessage = "User Details Updated Successfully!";
          // @ts-ignore
          this.zipDisplay = response["zipcode"];
        })
      }
      if (this.dateOfBirth != null) {
        data = { "dob": this.dateOfBirth };
        this.http.put(this.url + 'dob', data, { withCredentials: true }).subscribe(response => {
          this.successMessage = "User Details Updated Successfully!";
          // @ts-ignore
          this.dateOfBirthDisplay = response["dob"];
        })
      }
      if (this.contactNumber != null) {
        data = { "phone": this.contactNumber };
        this.http.put(this.url + 'phone', data, { withCredentials: true }).subscribe(response => {
          this.successMessage = "User Details Updated Successfully!";
          // @ts-ignore
          this.contactNumberDisplay = response["phone"];
        })
      }
      if (this.Password != null && this.confirmPassword != null) {
        data = { "password": this.Password };
        this.http.put(this.url + 'password', data, { withCredentials: true }).subscribe(response => {
          this.successMessage = "User Details Updated Successfully!";
          // @ts-ignore
          // this.contactNumberDisplay = response["phone"];
        })
      }
    }

  }
}
