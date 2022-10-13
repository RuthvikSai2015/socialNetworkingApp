import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { DataService } from "../../../services/data.service";
import { UserService } from "../../../services/user.service";
import { PostService } from "../../../services/post.service";
import { FollowerService } from "../../../services/follower.service";
import { Observable } from "rxjs";
import { User } from "../../../common/user";
import { timestamp } from "rxjs/operators";
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
    private router: Router,
    private dataTransmit: DataService,
    private userTransmit: UserService,
    private postTransmit: PostService,
    private followerTransmit: FollowerService) {
    this.url = " ";
    this.userObj = "";
    this.usersToQuery = [];
  }

  ngOnInit(): void {
    this.userObj = "sara";
    this.tempPost = [{ url: "../assets/images/image1.png", _id: "1", author: "sara", date: "01-12-3323", text: "sample",comments:[{author:"yes",text:"text1"},{author:"yes1",text:"text2"}]},
    { url: "../assets/images/image2.png", _id: "2", author: "sara", date: "01-12-3323", text: "sample",comments:[{author:"yes",text:"text1"}] },
    { url: "../assets/images/image3.png", _id: "3", author: "sara", date: "01-12-3323", text: "sample" ,comments:[{author:"yes",text:"text1"}]},
    { url: "../assets/images/image4.png", _id: "4", author: "sara", date: "01-12-3323", text: "sample" ,comments:[{author:"yes",text:"text1"}]}]

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
  clearPost2() {
    this.inputNewPost2 = "";
  }
  clearAllposts() {
    this.tempPost = [];
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


  showAllPosts() {
    window.location.reload();
  }

  showComments() {
    alert("Messsage 1: This post is awesome.\n" +
      "Message 2: Nice!\n" +
      "Message 3: This post is prefect!");
  }


  editText() {

  }

  editTextHere() {
   
  }
}

