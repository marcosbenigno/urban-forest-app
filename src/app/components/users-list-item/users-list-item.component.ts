import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.scss'],
})
export class UsersListItemComponent implements OnInit {

  @Input() followerId: any;
  @Input() loggedUserFollowingList: any;

  user: any;
  following: boolean = false;

  constructor(public authService: AuthService, public userService: UserService) { }

  ngOnInit() {
    this.getUser();

    this.checkIfIsFollowing();
    console.log(this.followerId);
    console.log(this.loggedUserFollowingList, 'aque');
  }


  getUser() {
    this.userService.showUser(this.followerId).subscribe((res) => {
      this.user = res.user;
    });
  }

  follow() {
    this.authService.followUser(this.followerId).subscribe((res) => {
      console.log('followed');
      this.following = true;
    });
  }

  unfollow() {
    this.authService.unfollowUser(this.followerId).subscribe((res) => {
      console.log('unfollowed');
      this.following = false;
    });
  }

  checkIfIsFollowing() {
    this.loggedUserFollowingList.forEach(element => {
      
      if (element.followers_id == this.followerId || element.followings_id == this.followerId) {
        this.following = true;
      }
    });
  }

}
