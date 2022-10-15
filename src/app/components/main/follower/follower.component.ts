import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Follower } from "../../../common/follower";

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {
  url: string;
  inputName: any;
  nameCheck: any;
  public dummyFollowersNames: [];
  public dummyFollowers: Follower[];
  tempDummyFollowers: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.dummyFollowersNames = [];
    this.dummyFollowers = [];
    this.url = "";

  }
  ngOnInit(): void {
    this.dummyFollowersNames = [];
    if (localStorage.getItem("userId")?.toString() != <string>"newUser") {
      for (let x = 1; x <= 3; x++) {
        this.dummyFollowers.push({
          "image": `../assets/images/image${x}.png`,
          "name": `follower${x}`,
          "status": "away"
        })
      }
    }

  }
  createFollowersHelper(i: number) {

  }

  createFollowers() {

    var newF = (<HTMLInputElement>document.getElementById("newFollower")).value

    if (newF != "") {

      this.dummyFollowers.push({
        "image": "../assets/images/image4.png",
        "name": newF,
        "status": "online"
      })

    }
    //  window.location.reload();
  }

  removeFollowersHelper(removeId: number) {
  }

  removeFollowers(removeName: string) {
    for (let x in this.dummyFollowers) {
      if (this.dummyFollowers[x].name === removeName) {
        delete this.dummyFollowers[x];
      }
    }

    window.location.reload();
  }

}

