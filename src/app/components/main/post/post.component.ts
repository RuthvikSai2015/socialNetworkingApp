import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../../../common/user";
import { timestamp } from "rxjs/operators";
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  url: string;
  usersUrl : string;
  inputNewPost: any;
  inputNewPost2: any;
  userObj: any;
  usersToQuery: any;
  imgUrl: any;
  author: any;
  public dummyPost: any[] = [];  //all posts( ten person)
  public tempPostForSearch: any[] = [];
  public tempPost: any[] = []; //post need to print (searched posts or the 4 person posts)
  public addedPost: any[] = [];
  public searchedPost: any[] = [];
  inputSearch: any;
  inputNewComment: any;
  inputNewText: any;
  inputNewTextId: any;
  inputNewCommentId: any;
  inputNewComment2: any;
  constructor(private http: HttpClient,
    private router: Router,) {
    this.url = "https://jsonplaceholder.typicode.com/posts";
    this.usersUrl = "https://jsonplaceholder.typicode.com/users";
    this.userObj = "";
    this.usersToQuery = [];
    this.author = [];
  }

  ngOnInit(): void {
    this.userObj = "sara";
    this.author = [
      {
        "id": 1,
        "name": "Leanne Graham"
      },
      {
        "id": 2,
        "name": "Ervin Howell",
      },
      {
        "id": 3,
        "name": "Clementine Bauch",
      },
      {
        "id": 4,
        "name": "Patricia Lebsack",
      },
      {
        "id": 5,
        "name": "Chelsey Dietrich"
      },
      {
        "id": 6,
        "name": "Mrs. Dennis Schulist"
      },
      {
        "id": 7,
        "name": "Kurtis Weissnat",
      },
      {
        "id": 8,
        "name": "Nicholas Runolfsdottir V"
      },
      {
        "id": 9,
        "name": "Glenna Reichert",
      },
      {
        "id": 10,
        "name": "Clementina DuBuque"
      }
    ];
    let i = 1;
    let authorData="";
    this.http.get(this.url, { withCredentials: true }).subscribe(response => {
      for (let data in response) {
        // @ts-ignore
        console.log(response.userId);
        // @ts-ignore
        if (localStorage.getItem("userId") == response[data].userId) {
           // @ts-ignore
          authorData = this.getUserName(response[data].id);
          this.tempPost.push({
            url: `../assets/images/image${i}.png`,
            // @ts-ignore
            author: authorData,
            // @ts-ignore
            title: response[data].title,
            // @ts-ignore
            text: response[data].body,
            date: new Date(),
          })
          i++;
        }
      }
    })

  }
  getUserName(id: any) {
    console.log(id);
    let userFirstName = ""
    for(let newData in this.author){
       // @ts-ignore
      if(id == this.author[newData].id){
         // @ts-ignore
        userFirstName= this.author[newData].name;
      }
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

  }

  clearPost() {
    this.inputNewPost = "";
  }

  newSearch() {
    var tempPost2 = this.tempPost;
    if (this.tempPostForSearch.length != 0)
      tempPost2 = this.tempPostForSearch;
    this.searchedPost = [];
    this.tempPostForSearch = tempPost2;
    for (var i = 0; i < tempPost2.length; i++) {
      if (tempPost2[i].author.includes(this.inputSearch) || tempPost2[i].text.includes(this.inputSearch)) {
        this.searchedPost.push(tempPost2[i]);
      }
    }
    this.tempPost = this.searchedPost;
  }

  newSearchText() {

  }

  showComments() {

  }


  editText() {

  }

  editTextHere() {

  }
}

