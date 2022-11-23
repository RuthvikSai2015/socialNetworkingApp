import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavigationEnd, Router } from "@angular/router";
import { Follower } from "../../../model/follower";
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {
  url: string = "";
  inputName: any;
  nameCheck: any;
  followers: Follower[] = [];
  followerArticles: any[] = [];
  routerSubscription: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.router.navigated = false;
      }
    });
  }
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.followers = [];
    this.followerArticles = [];
    if (localStorage.getItem("Followers")) {
      let tmpfollowers = JSON.parse(localStorage.getItem("Followers")!);
      for (let f in tmpfollowers) {
        if (tmpfollowers[f] !== null) {
          this.followers.push({
            id: tmpfollowers[f].id,
            image: tmpfollowers[f].image,
            name: tmpfollowers[f].name,
            status: tmpfollowers[f].status
          });
        }
      }
    }

  }

  async addFollower() {

    this.nameCheck = "";
    this.url = "https://jsonplaceholder.typicode.com/users";
    let currentUserId = localStorage.getItem("userId");
    let currentUserName = localStorage.getItem("userName");
    let currentName = localStorage.getItem("name");
    let response$ = this.http.get(this.url, { withCredentials: true });
    let response: any = await lastValueFrom(response$);
    let followerId = 0;
    let followerName = "";
    let isValid: boolean = false;

    if (currentUserName?.trim() == this.inputName.trim()) {
      this.nameCheck = "You cannot follow yourself";
      return;
    }
    for (let idx in response) {
      let uname = response[idx].name;
      if (this.inputName == uname) {
        isValid = true;
        break;
      }
    }
    if (isValid) {
      for (let idx in response) {

        if (response[idx].name.trim() == this.inputName.trim()) {
          let isAlreadyFollowing = this.followers.find(x => { return x.name == this.inputName.trim() });
          if (isAlreadyFollowing == undefined) {
            followerId = response[idx].id;
            followerName = response[idx].name;
            let name = response[idx].name;
            this.followers.push({
              id: followerId,
              image: "../assets/images/image4.png",
              name: name,
              status: "Online"
            })
    //        await this.addArticles(followerId, followerName);
            break;

          }
          else {
            this.nameCheck = "You already following this user";
            return;
          }

        }

      }
      localStorage.removeItem("Followers");
      localStorage.setItem("Followers", JSON.stringify(this.followers));
      //localStorage.setItem("UsersPosts", JSON.stringify(this.followerArticles));
      window.location.reload();
    }
    else {
      this.nameCheck = "The user does not exist. You cannot follow this user.";
    }

  }


  async addArticles(userId: number, userName: string) {

    this.url = "https://jsonplaceholder.typicode.com/posts/" + userId;
    let response$ = this.http.get(this.url, { withCredentials: true });
    let response: any = await lastValueFrom(response$);

    //for (let data in response) {
    this.followerArticles.push(
      {
        userId: response.userId,
        id: response.id,
        url: '',
        author: userName,
        title: response.title,
        text: response.body,
        date: new Date(),

      })
    //}

  }
  removeFollowers(id: number) {
    let tFollowers = [];
    let tFollowerArticles = [];
    for (let i: number = 0; i < this.followers.length; i++) {
      if (this.followers[i].id == id) {
        //tFollowers.push(this.followers[i]);
      }
      else {
        tFollowers.push(this.followers[i]);
      }
    }
    for (let i: number = 0; i < this.followerArticles.length; i++) {
      if (this.followerArticles[i].userId == id) {
        //tFollowerArticles.push(this.followerArticles[i]);
      }
      else {
        tFollowerArticles.push(this.followerArticles[i]);
      }

    }
    localStorage.removeItem("Followers");

    localStorage.setItem("Followers", JSON.stringify(tFollowers));

    window.location.reload();
  }

}

