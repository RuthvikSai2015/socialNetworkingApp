import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavigationEnd, Router } from "@angular/router";
import { Follower } from "../../../model/follower";
import { lastValueFrom } from 'rxjs';
import {url } from '../../../../environments/environment'

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
    this.url=url;
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
    this.http.get(this.url + 'following', {withCredentials: true}).subscribe(res => {
      // @ts-ignore
      let names = res.followers;
      //@ts-ignore
      names.forEach((value) => {
        this.http.get(this.url + 'avatar/' + value, {withCredentials: true}).subscribe(response => {
            // @ts-ignore
            var image = response["avatar"];
            var name = value;
            var status = name + "'s headline";
            // @ts-ignore
            this.followers.push({
              "image": image,
              "name": name,
              // @ts-ignore
              "status": status
            })
          })
        })
      })

  }

  async addFollower() {

    this.nameCheck = "";
    var newF = (<HTMLInputElement>document.getElementById("newFollower")).value
    if (newF != "" ) {
      this.http.put(this.url + 'following/' + newF , {} , {withCredentials: true}).subscribe(res => {
        // @ts-ignore
        if (res["result"] === "you cannot follow yourself")
          this.nameCheck = "you cannot follow yourself";
        // @ts-ignore
        if (res["result"] === "the follow user do not exist")
          this.nameCheck = "the follow user do not exist";
        // @ts-ignore
        if (res["result"] === "the user already exist as follower")
          this.nameCheck = "the user already exist as follower";
        // @ts-ignore
        if(res["following"].length > this.followers.length)
           window.location.reload();
      })
    }
    
     //window.location.reload();
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
  removeFollowers(name: string) {
    this.http.delete(this.url + 'following/' + name, {withCredentials: true}).subscribe(res => {
    })
    window.location.reload();
  }

}

