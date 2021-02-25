import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  posts: any;
  loggedUser: any = localStorage.getItem('my_id'); 
  postOwner: any = '';

  constructor(public router: Router, public postService: PostService) { }

  ngOnInit() {
    //this.getPosts();
    this.posts = [{title: 'Houseplants: novo estilo de decoração.',
    text: 'Amo.'}
  ];
  this.postOwner = {
    name: 'José Andrade',
    nickname: 'joseandrade'
  };
  }

  //check if user is logged, else redirects
  ionViewWillEnter() {
    if (!localStorage.getItem('my_id')) {
      this.router.navigate(['/start']);
    }
  }

  getPosts() {
    if (this.loggedUser) {
    this.postService.listPostsFromUser().subscribe((res) => {
      console.log(res);
      this.posts = res.post[0];
    });
    }
  }

}
