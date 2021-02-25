import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-followed-by',
  templateUrl: './followed-by.page.html',
  styleUrls: ['./followed-by.page.scss'],
})
export class FollowedByPage implements OnInit {

  userId: any = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('my_id');
  loggedUserId: any = localStorage.getItem('my_id');
  followers: any;
  userName: any;
  loggedUserFollowingList: any;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.getFollowingList();
    this.getFollowers();
    this.getUser();

  }

  getFollowers() {
    this.userService.listFollowers(this.userId ? this.userId : this.loggedUserId).subscribe((res) => {
      this.followers = res.followers;
      console.log(res.followers);
     // console.log(res);
    });
  }

  getUser() {
    this.userService.showUser(this.userId).subscribe((res) => {
      this.userName = res.user.name;
    });
  }

  getFollowingList() {
    this.userService.listFollowers(this.userId ? this.userId : this.loggedUserId).subscribe((res) => {
      this.loggedUserFollowingList = res.followers;
      console.log(res.followers, 'here');
    });
  }

}
