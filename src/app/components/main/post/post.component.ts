import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from 'rxjs';
import {url} from '../../../../environments/environment' 

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  url: string;
  usersUrl: string;
  inputNewPost: any;
  inputNewPost2: any;
  userObj: any;
  usersToQuery: any;
  imgUrl: any;
  author: any;
  public dummyPost: any[] = [];
  public tempPostForSearch: any[] = [];
  public tempPost: any[] = [];
  followers: any[] = [];
  public addedPost: any[] = [];
  public searchedPost: any[] = [];
  inputSearch: any;
  inputNewComment: any;
  inputNewText: any;
  inputNewTextId: any;
  inputNewCommentId: any;
  inputNewComment2: any;
  routerSubscription: any;

  constructor(private http: HttpClient,
    private router: Router,) {

    this.url = url;
    this.usersUrl = "https://jsonplaceholder.typicode.com/users";
    this.userObj = "";
    this.usersToQuery = [];
    this.author = [];
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.router.navigated = false;
      }
    });
  }

  async ngOnInit() {
    this.http.get(this.url + 'username/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      this.userObj = res["username"];
      this.http.get(this.url + 'articles/'+this.userObj, {withCredentials: true}).subscribe(res => {
        // @ts-ignore
          this.tempPost = res[0]["articles"]
        })
      })
  }
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  getUserName(id: any) {
    console.log(id);
    let userFirstName = "";
    for (let newData in this.author) {
      // @ts-ignore
      if (id == this.author[newData].id) {
        // @ts-ignore
        userFirstName = this.author[newData].name;
      }
    }
    if (userFirstName == "") {
      userFirstName = "Sample Author"
    }
    return userFirstName;
  }
  uploadImage() {
    // @ts-ignore
    let file = (<HTMLInputElement>document.getElementById("newImage")).files[0];
    if (file) {
      const fd = new FormData();
      fd.append('image', file);
    }
  }
  newPost() {
    this.http.get(this.url + 'username/', { withCredentials: true}).subscribe(res => {
      // @ts-ignore
      var currUser = res["username"];
      var data5 = {
        "url": this.imgUrl,
        "author": currUser,
        "date": "12/27/2021:12:00:34",
        "title": "new post",
        "text":  this.inputNewPost
      }
      this.http.post(this.url + 'article', data5, { withCredentials: true}).subscribe(res2 => {
        // @ts-ignore
        var len = res2["articles"].length - 1;
        data5 = {
          "url": this.imgUrl,
          "author": currUser,
          "date": "12/27/2021:12:00:34",
          "title": "new post",
          "text":  this.inputNewPost,
          // @ts-ignore
          "_id": res2["articles"][len]._id
        }
        this.tempPost.unshift(data5);
        this.addedPost.push(data5);
        this.inputNewPost="";
      })

    })
  }

  clearPost() {
    this.inputNewPost = "";
  }

  searchFunction() {
    var tempPostSwap = this.tempPost;
    if (this.tempPostForSearch.length != 0)
      tempPostSwap = this.tempPostForSearch;
    this.searchedPost = [];
    this.tempPostForSearch = tempPostSwap;
    for (var i = 0; i < tempPostSwap.length; i++) {
      if (tempPostSwap[i].author.includes(this.inputSearch) || tempPostSwap[i].text.includes(this.inputSearch)) {
        this.searchedPost.push(tempPostSwap[i]);
      }
    }
    this.tempPost = this.searchedPost;
  }
}

