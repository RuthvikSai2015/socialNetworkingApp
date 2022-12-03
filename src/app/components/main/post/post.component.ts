import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from 'rxjs';
import { url } from '../../../common/env'

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
    this.pageData();

  }
  pageData() {

    // @ts-ignore

    this.http.get(this.url + 'articles/', { withCredentials: true }).subscribe(articleResponse => {
      // @ts-ignore
      // this.tempPost = articleResponse["posts"];
      // @ts-ignore
      articleResponse["posts"].forEach((datas) => {
        var comments;
        //@ts-ignore
        for (var i = 0; i < datas.comments.length; i++) {
          comments = datas.comments[i].text;
        }
        var data =
        {
          "_id": datas._id,
          "author": datas.author,
          "text": datas.text,
          "url": datas.url,
          "date": datas.date,
          "comments": datas.comments,
          "lastComment": comments,
          "__v": 0
        }
        this.tempPost.push(data);
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
  async uploadImage() {
    // @ts-ignore
    let file = (<HTMLInputElement>document.getElementById("newImage")).files[0];
    if (file) {
      const fd = new FormData();
      fd.append('image', file);
       this.http.put(this.url + 'url', fd, { withCredentials: true }).subscribe(res => {
        // @ts-ignore
        this.imgUrl = res["url"];
      })
    }
  }
  async newPost() {
   // await this.uploadImage();
   var date = new Date();
   let current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	 let current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    setTimeout(() => {
      this.http.get(this.url + 'username', { withCredentials: true }).subscribe(res => {
        // @ts-ignore
        var currUser = res["username"];
        var data5 = {
          "url": this.imgUrl,
          "author": currUser,
          "date": current_date +" "+current_time,
          "text": this.inputNewPost
        }
        this.http.post(this.url + 'article', data5, { withCredentials: true }).subscribe(res2 => {
          // @ts-ignore
          var len = res2["articles"].length - 1;
          data5 = {
            "url": this.imgUrl,
            "author": currUser,
            "date": current_date +" "+current_time,
            "text": this.inputNewPost,
            // @ts-ignore
            "_id": res2["articles"][len]._id
          }
          this.tempPost.unshift(data5);
          this.addedPost.push(data5);
          this.inputNewPost = "";
        })

      })
    }, 500);

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
      // @ts-ignore
      tempPostSwap[i].comments.forEach((value) => {
        if (value.author.includes(this.inputSearch) || value.text.includes(this.inputSearch)) {
          this.searchedPost.push(tempPostSwap[i]);
        }
      })

    }
    this.tempPost = this.searchedPost;
  }
  editText(currentPosts: []) {
    // @ts-ignore
    var newText = <HTMLInputElement>document.getElementById(currentPosts._id + "editT").value;
    // @ts-ignore
    let comments = [];
    // @ts-ignore
    for (var i = 0; i < currentPosts.comments.length; i++) {
      // @ts-ignore
      if (i == currentPosts.comments.length - 1) {
        // @ts-ignore
        comments.push({ author: currentPosts.comments[i].author, text: newText, date: new Date() });
      } else {
        // @ts-ignore
        comments.push({ author: currentPosts.comments[i].author, text: currentPosts.comments[i].text, date: currentPosts.comments[i].date });
      }
    }
    // @ts-ignore
    this.http.put(this.url + 'lastComment/' + currentPosts._id, { "comments": comments, }, { withCredentials: true }).subscribe(res => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })

  }
  editComment(currentPosts: []) {
    // @ts-ignore
    console.log(currentPosts._id);
    // @ts-ignore
    this.http.put(this.url + 'comment/' + currentPosts._id, { "text": <HTMLInputElement>document.getElementById(currentPosts._id + "editC").value }, { withCredentials: true }).subscribe(res => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    // window.location.reload();
  }
}

