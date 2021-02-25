import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../app/services/post/post.service';
import { UserService } from '../../app/services/user/user.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('my_id');
  user: any = '';
  posts: any = '';
  loggedUserFollowingList: any = '';

  constructor(public postService: PostService, public userService: UserService, public router: Router, public authService: AuthService) { }

  ngOnInit() {
    //this.getUser();
    //this.listPostsByUser();
  }

  ionViewWillEnter() {  
  //check if user is logged, else redirects
    if (!localStorage.getItem('my_id')) {
      this.router.navigate(['/start']);
    }
  /*this.getFollowingList();
    this.getUser();
    this.listPostsByUser(); */

    this.posts = [
      {title: 'Houseplants: novo estilo de decoração.',
      text: 'Amo.'}
    ];
    this.user = {
      name: 'José Andrade',
      nickname: 'joseandrade'
    };
  }

  logOutUser() {
    this.authService.logOutUser();
    this.router.navigate(['/tabs/trending']);
  }

  getUser() {
    this.userService.showUser(this.userId).subscribe((res) => {
      this.user = res.user;
      console.log(this.user);
    });
  }

  listPostsByUser() {
    this.postService.listPostsByUser(this.userId).subscribe((res) => {
      this.posts = res.list;
    });
  }

  goToTrending() {
    localStorage.setItem('user_id', '');
    this.router.navigate(['/tabs/trending']);
    this.getUser();
  }

  getFollowingList() {
    this.userService.listFollowers(this.userId).subscribe((res) => {
      this.loggedUserFollowingList = res.followers;
      console.log(res.followers, 'here');
    });
  }

}
