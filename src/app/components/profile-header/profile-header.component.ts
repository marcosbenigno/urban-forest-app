import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  profileOwner: boolean = false;
  following: boolean = false;
  userId: any = localStorage.getItem('user_id');
  numberOfFollowers: any;
  numberOfFollowings: any;
  loggedUserFollowingList: any;
  @Input() user: any;
  constructor(public authService: AuthService, public userService: UserService) { }
  
  ngOnInit() {
   /* this.checkProfileOwner();
    this.getNumberOfFollowers();
    this.getNumberOfFollowings(); */
    this.user = {
      name: 'José Andrade',
      nickname: 'joseandrade',
      bio: 'Amante de suculentas',
    };
    this.numberOfFollowers = 320;
    this.numberOfFollowings = 120;
  }

  checkProfileOwner() {
    if (!localStorage.getItem('user_id') || (localStorage.getItem('my_id') == localStorage.getItem('user_id'))) {
      this.profileOwner = true;
    }
  }

  follow() {
    this.authService.followUser(this.userId).subscribe((res) => {
      console.log('seguiu');
      this.following = true;
      this.numberOfFollowings++;
    });
  }

  unfollow() {
    this.authService.unfollowUser(this.userId).subscribe((res) => {
      console.log('unfollowed');
      this.following = false;
      this.numberOfFollowings--;
    });
  }

  getNumberOfFollowers() {
    this.userService.listFollowers(localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('my_id')).subscribe((res) => {
      this.numberOfFollowings  = res.followers.length;
      console.log(res.followers, "followers");
    });
  }

  getNumberOfFollowings() {
    this.userService.listFollowings(localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('my_id')).subscribe((res) => {
      this.numberOfFollowers = res.followings.length;
      this.loggedUserFollowingList = res.followings;
      this.checkIfIsFollowing();
    });
  }

  checkIfIsFollowing() {
    //console.log(this.loggedUserFollowingList);
    this.loggedUserFollowingList.forEach(element => {
      console.log(element, 'el', this.userId);
      if (element.following_id == this.userId) {
        this.following = true;
      }
    });
  }



}
