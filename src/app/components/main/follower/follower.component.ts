import { Component, OnInit } from '@angular/core';
import{ DataService} from "../../../services/data.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Follower} from "../../../common/follower";
import { FollowerService} from "../../../services/follower.service"

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
  constructor(private userData: DataService,
              private http: HttpClient,
              private router: Router,
              private followerService: FollowerService,
  ) {
    this.dummyFollowersNames = [];
    this.dummyFollowers = [];
    this.url = "";   

  }
  ngOnInit(): void {
    this.dummyFollowersNames = [];
    this.dummyFollowers.push({
      "image": "../assets/images/image3.png",
      "name": "name",
      "status": "away"
    })
  }
  createFollowersHelper(i : number) {
   
  }

   createFollowers() {

    var newF = (<HTMLInputElement>document.getElementById("newFollower")).value
   
    if (newF != "" ) {

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
    for(let x in this.dummyFollowers){
      if(this.dummyFollowers[x].name === removeName){
        delete this.dummyFollowers[x];
      }
    }
   
   window.location.reload();
  }

}

