import { Component, OnInit } from '@angular/core';
import { DataService} from "../../../services/data.service";
@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  url: string;
  printPost: any[] = [];
  constructor(private dataTransmit: DataService) {
    this.printPost = [{author:"author1",timestamp:"t1",title:"t1",body:"b1"},
    {author:"author2",timestamp:"t1",title:"t1",body:"b1"},
    {author:"author3",timestamp:"t1",title:"t1",body:"b1"}];
    this.url = "";   
  }

  ngOnInit(): void {
  }

}
