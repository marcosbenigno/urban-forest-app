import { Component, OnInit } from '@angular/core';
import { PostService } from '../../app/services/post/post.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {

  posts = [];

  constructor(public postService: PostService, public userService: UserService) { }

  ngOnInit() {
    //this.getPosts();
  }

  ionViewDidEnter() {
    //this.getPosts();
    this.posts = [
      {title: 'Houseplants: meu novo estilo de decoração',
      user_name: 'José Andrade'},
      {title: 'Primeira semana com alimentação vegana.',
      user_name: 'Marjorie Oliveira'}
    ];
  }

  getPosts() {
    this.postService.listPosts().subscribe((res) => {
      this.addUserInfoToPostObject(res.post);
      
    });
  }

  addUserInfoToPostObject(posts) {
    for (let i = 0; i < posts.length; i++) {
      let post = posts[i];
      this.userService.showUser(post.user_id).subscribe((res) => {
        post.user_name = res.user.name;
        post.user_media = res.user.profile_picture;
      });
    }
    this.posts = posts;
  }

}

