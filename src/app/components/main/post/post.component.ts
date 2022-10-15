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
  inputNewPost: any;
  inputNewPost2: any;
  userObj: any;
  usersToQuery: any;
  imgUrl: any;
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
    this.userObj = "";
    this.usersToQuery = [];
  }

  ngOnInit(): void {
    this.userObj = "sara";
    let i=1;
    this.http.get(this.url + `/${localStorage.getItem("userId")}`, { withCredentials: true}).subscribe(response => {
      for(let data in response){
          // @ts-ignore
        this.tempPost.push({
          url:`../assets/images/image${i}.png`,
          author: <string>localStorage.getItem("userName"),
            // @ts-ignore
          text:response.body,
          date:new Date(),
        })
        i++;        
      }
   })

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

  newPost2() {
   
        this.tempPost.unshift();
        this.addedPost.push();
        this.inputNewPost2 = "";

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

