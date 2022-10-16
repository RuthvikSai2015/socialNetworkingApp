import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  url: string;
  userName: any;
  inputNewStatus: any;
  userHeadLine: any;
  imgUrl: any;

  constructor(private http: HttpClient,
    private router: Router) {
    this.url = " ";  
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')?.toString();;
    this.userHeadLine = "headline";
    // @ts-ignore
    if(localStorage.getItem("userId")?.toString() != <string>"newUser"){
    this.imgUrl = "https://m.media-amazon.com/images/I/71zIISn3b5S._SX425_.jpg";
    }

  }

  logOutHelper() {
    this.userName = "";
    this.inputNewStatus = "";
    this.userHeadLine = "";
    localStorage.clear();
  }
  logOut() {
    this.logOutHelper();
    this.router.navigate(['login']);

  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  changeStatus() {
    if ((<HTMLInputElement>document.getElementById("userStatus")).value != "") {
      (<HTMLInputElement>document.getElementById("userStatus")).innerHTML = this.inputNewStatus;
    }
  }


}
