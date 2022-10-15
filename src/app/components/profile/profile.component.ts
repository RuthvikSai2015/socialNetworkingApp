import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { DataService} from "../../services/data.service";

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
  displayName : string | undefined
  emailId: string | undefined
  contactNumber: string | undefined
  dateOfBirth: string | undefined
  zipCode: string | undefined
  Password: string | undefined
  confirmPassword: string | undefined
  phone: any;
  email: any;
  DOB: any;
  ziper: any;
  img: File | undefined;
  imgUrl: string | undefined;
  // fileToUpload: File | null = null;
  constructor(private http: HttpClient, private router: Router, private data: DataService, private userData: DataService) {
    this.nameCheck = "";
    this.emailCheck = "";
    this.birthCheck = "";
    this.zipCheck = "";
    this.phoneCheck = "";
    this.passwordCheck="";
    this.data.currentMessage.subscribe(res=>this.userName=res);
    this.url = "";
  }
  ngOnInit(): void {
     this.imgUrl = "https://m.media-amazon.com/images/I/71zIISn3b5S._SX425_.jpg";
      this.userName = localStorage.getItem('userName')?.toString();
      this.DOB = <string>localStorage?.getItem('dateOfBirth');
      this.phone = <string>localStorage?.getItem('phone');
      this.ziper = <string>localStorage?.getItem('ZIP');
      this.displayName = <string>localStorage?.getItem('displayName');
    //  this.Password = <string>localStorage?.getItem(('password'));
      this.email = <string>localStorage?.getItem(('email'));

  }

  onSubmit() {
    this.router.navigate(['main']);
  }

  onSubmit2() {
var namePattern =  new RegExp("^[A-Za-z]\\w{3,29}$");
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
   if(typeof this.dateOfBirth === "string"){
    this.birthCheck = "Please enter Date of Birth";
   }
      
    if (userDob.getTime() > now) {
      this.birthCheck = "User must older than 18 years old";
    }
    else {
      this.birthCheck = "";
    }
    if (typeof this.userName === "string" && this.userName != "")
      resultName = namePattern.test(this.userName);
    if (!resultName)
      this.nameCheck = "Please enter a valid value that should not start with digit and min length is 6";

    if (this.userName && resultName)
      this.nameCheck = "";
    if (typeof this.emailId === "string" && this.emailId != "")
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
      this.passwordCheck="";
    else
      this.passwordCheck = "Passwords do not match!";
    if (this.birthCheck == "" &&
      this.nameCheck == "" &&
      this.emailCheck == "" &&
      this.zipCheck == "" &&
      this.phoneCheck == "" &&
      this.passwordCheck=="") {
      this.router.navigate(['profile']);
    }
  }
}
