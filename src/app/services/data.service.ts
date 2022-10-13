import {Injectable } from "@angular/core";
import{BehaviorSubject }from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService{
  // public firstEnterFlag: boolean = true;   //when first enter, we use the getFollower method to get the last three initially followers
  public userData: any = 0;    //current user data
  public postData: any = 0;
  public dummyPost: any = 0;   //all posts
  public dummyUser: any = 0;    //all users
  public searchPost: any = 0;   // posts need to show
  public addedPost: any = 0;    //added posts
  public currentMessage=new BehaviorSubject<string>('default data');
  public timeTemp: string[] = ["10/11/2021:12:00:37", "10/11/2021:12:00:36","10/11/2021:12:00:35", "10/11/2021:12:00:34",
    "10/10/2021:12:00:37", "10/10/2021:12:00:36","10/10/2021:12:00:35", "10/10/2021:12:00:34",
    "10/9/2021:12:00:37", "10/9/2021:12:00:36","10/9/2021:12:00:35", "10/9/2021:12:00:34",
    "10/8/2021:12:00:37", "10/8/2021:12:00:36","10/8/2021:12:00:35", "10/8/2021:12:00:34",
    "10/7/2021:12:00:37", "10/7/2021:12:00:36","10/7/2021:12:00:35", "10/7/2021:12:00:34",
    "10/6/2021:12:00:37", "10/6/2021:12:00:36","10/6/2021:12:00:35", "10/6/2021:12:00:34",
    "10/5/2021:12:00:37", "10/5/2021:12:00:36","10/5/2021:12:00:35", "10/5/2021:12:00:34",
    "10/4/2021:12:00:37", "10/4/2021:12:00:36","10/4/2021:12:00:35", "10/4/2021:12:00:34",
    "10/3/2021:12:00:37", "10/3/2021:12:00:36","10/3/2021:12:00:35", "10/3/2021:12:00:34",
    "10/3/2021:12:00:37", "10/3/2021:12:00:36","10/3/2021:12:00:35", "10/3/2021:12:00:34",
  ];
  constructor(){}

  changeMessage(message:string):void{
    this.currentMessage.next(message)
  }

}
