import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      imports:[HttpClientModule],
      providers: [HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it('should fetch articles for current logged in user',async ()=>{
    let posts:number = component.tempPost.length;
    await component.getArticles();
    let newposts:number = component.tempPost.length;
    expect(newposts).toBeGreaterThan(posts);
  });

  it('should filter displayed articles by the search keyword',async ()=>{
    //let posts:number = component.tempPost.length;
    await component.getArticles();
    let newposts:number = component.tempPost.length;
    await component.searchFunction();

    let search:number = component.searchedPost.length;

    expect(newposts).toBeGreaterThanOrEqual(search);
  });


  

});
