import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerComponent } from './follower.component';

describe('FollowerComponent', () => {
  let component: FollowerComponent;
  let fixture: ComponentFixture<FollowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowerComponent ],
      imports:[HttpClientModule],
      providers: [HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add articles when adding a follower', async () => {
    let articlesCount = component.followerArticles.length;
    component.addFollower();
    await fixture.whenStable();
    let articlesCountFollower = component.followerArticles.length;
    expect(articlesCountFollower).toBeGreaterThan(articlesCount);
   // expect(articlesCountFollower).toEqual(10);
  });

  it('should remove articles when removing a follower', async () => {
    let articlesCount = component.followerArticles.length;
    component.removeFollowers(component.followers[0].id);
    await fixture.whenStable();
    let articlesCountFollower = component.followerArticles.length;
    //expect(articlesCountFollower).toBeLessThanOrEqual(articlesCount);
    expect(articlesCountFollower).toEqual(0);
  });


});
