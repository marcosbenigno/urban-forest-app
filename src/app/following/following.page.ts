import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {

  userId: any = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('my_id');
  loggedUserId: any = localStorage.getItem('my_id');
  followings: any;
  userName: any;
  loggedUserFollowingList: any;
  followingsArray: any = [];
  

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.getUser();
    this.getFollowingList();
    this.getFollowings();
   
    //console.log(this.followings.id);
    //console.log(this.loggedUserFollowingList);
  }

  getFollowings() {
    this.userService.listFollowings(this.userId ? this.userId : this.loggedUserId).subscribe((res) => {
      this.followings = res.followings;
      this.followings.forEach(element => {
        this.followingsArray.push(element.following_id)
        
        });
        //console.log(this.followingsArray);
    });
  }

  getFollowingList() {
    this.userService.listFollowers(this.userId ? this.userId : this.loggedUserId).subscribe((res) => {
      this.loggedUserFollowingList = res.followers;
      console.log(res, 'here');
    });
  }

  getUser() {
    this.userService.showUser(this.userId).subscribe((res) => {
      this.userName = res.user.name;
    });
  }

}
