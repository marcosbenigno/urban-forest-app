import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../app/services/post/post.service';
import { UserService } from '../../app/services/user/user.service';
import { CommentService } from '../services/comment/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.page.html',
  styleUrls: ['./full-post.page.scss'],
})
export class FullPostPage implements OnInit {

  postId = localStorage.getItem('post_id');
  post: any = '';
  postOwner: any = '';
  
  loggedUser: any = localStorage.getItem('my_id');

  userIsModerator: boolean = false;

  comments: any = '';
  newCommentForm: FormGroup;
  
  constructor(public alertController: AlertController, public formbuilder: FormBuilder, public postService: PostService, public userService: UserService, public commentService: CommentService, public router: Router, public toastController: ToastController) {
    this.newCommentForm = this.formbuilder.group({
      text: [null, [Validators.required]]
    });
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.postId = localStorage.getItem('post_id');
    //this.getPost();
    //this.getComments();
    this.post = {
      title: 'Houseplants: novo estilo de decoração.',
      text: 'Amo.'
    };
    this.postOwner = {
      name: 'José Andrade',
      nickname: 'joseandrade'
    };

    this.comments = [
      {
        user_name: 'José Andrade',
      user_nickname: 'joseandrade',
      text: 'Amei.'
      }
    ];
    
  }

  getPost() {
    const self = this;
    this.postService.showPost(localStorage.getItem('post_id')).subscribe((res) => {
      this.post = res.post;
      console.log(res.post);
      self.getUser();
    });
  }

  getUser() {
    this.userService.showUser(this.post.user_id).subscribe((res) => {
      this.postOwner = res.user;
    });
  }

  addAditionalDataToForm() {
    this.newCommentForm.value.user_id = this.loggedUser;
    this.newCommentForm.value.post_id = this.post.id;
  }

  submitNewCommentForm(newCommentForm) {
    if (!localStorage.getItem('my_id')) {
      this.router.navigate(['/start']);
    } else {
      this.addAditionalDataToForm();
      console.log(newCommentForm.value);
      this.commentService.createComment(newCommentForm.value).subscribe((res)=> {
        this.showSuccessToast();
        this.getComments();
        this.newCommentForm.reset();
      });
  }
  }

  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Comentário publicado com sucesso.',
      duration: 2000
    });
    toast.present();
  }

  getComments() {
    this.commentService.listComments(this.postId).subscribe((res) => {
      this.addUserInfoToCommentObject(res.comment);
      console.log(res, 't');
      
    });
  }

  addUserInfoToCommentObject(comments) {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      this.userService.showUser(comment.user_id).subscribe((res) => {
        console.log(res.user.name);
        comment.user_name = res.user.name;
        comment.user_nickname = res.user.nickname;
        comment.user_media = res.user.profile_picture;      
      });
    }
    this.comments = comments;
  }  
}
