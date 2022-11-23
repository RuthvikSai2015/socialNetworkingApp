import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from 'rxjs';

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

    this.url = "https://jsonplaceholder.typicode.com/posts";
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

    await this.getArticles();
  }
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  async getArticles() {

    this.tempPost = [];
    this.followers = [];
    let _posts = [];
    let currentUserId = localStorage.getItem("userId");
    let currentUserName = localStorage.getItem("userName");

    let responseC$ = this.http.get(this.url, { withCredentials: true });
    let responseC: any = await lastValueFrom(responseC$);
    for (let p in responseC) {
      if (currentUserId == responseC[p].userId)
        _posts.push(responseC[p]);

    }


    for (let po = 0; po < _posts.length; po++) {

      let postId = _posts[po].id;
      let commentsC$ = this.http.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, { withCredentials: true });
      let commentsC: any = await lastValueFrom(commentsC$);
      let _comments = [];
      let k = 0;
      for (let c in commentsC) {
        if (k > 1)
          break;
        _comments.push({ email: commentsC[c].email, text: commentsC[c].name });
        k++;
      }

      this.tempPost.push(
        {
          userId: _posts[po].userId,
          id: _posts[po].id,
          url: `../assets/images/image${1}.png`,
          author: currentUserName,
          title: _posts[po].title,
          text: _posts[po].body,
          date: new Date(),
          comments: _comments
        });

    }
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
    _posts = [];
    for (let i = 0; i < this.followers.length; i++) {

      let response$ = this.http.get(this.url, { withCredentials: true });
      let response: any = await lastValueFrom(response$);

      for (let p in response) {
        if (this.followers[i].id == response[p].userId)

        _posts.push(response[p]);

      }


      for (let po = 0; po < _posts.length; po++) {

        let postId = _posts[po].id;
        let commentsC$ = this.http.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, { withCredentials: true });
        let commentsC: any = await lastValueFrom(commentsC$);
        let _comments = [];
        let k = 0;
        for (let c in commentsC) {
          if (k > 1)
            break;
          _comments.push({ email: commentsC[c].email, text: commentsC[c].name });
          k++;
        }
        let authorName = this.followers[i].name;
        this.tempPost.push(
          {
            userId: _posts[po].userId,
            id: _posts[po].id,
            url: '',
            author: authorName,
            title: _posts[po].title,
            text: _posts[po].body,
            date: new Date(),
            comments: _comments
          });

      }

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
    this.tempPost.push({
      url: '',
      // @ts-ignore
      author: localStorage.getItem("userName"),
      // @ts-ignore
      title: "Sample Title",
      // @ts-ignore
      text: this.inputNewPost,
      date: new Date(),
    })
    this.tempPost.sort(
      (objA, objB) => Number(objB.date) - Number(objA.date),
    );
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
      if (tempPostSwap[i].author.includes(this.inputSearch) || tempPostSwap[i].title.includes(this.inputSearch) || tempPostSwap[i].text.includes(this.inputSearch)) {
        this.searchedPost.push(tempPostSwap[i]);
      }
    }
    this.tempPost = this.searchedPost;
  }
}

