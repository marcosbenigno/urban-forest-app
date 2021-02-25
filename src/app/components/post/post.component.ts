import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { PostService } from '../../../app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit {
  heartFull: boolean = false;

  @Input() post: any;
  @Input() postOwner: any;
  @Input() postOwnerId: any;

  loggedUser: any = localStorage.getItem('my_id');

  userIsModerator: boolean = true;

  constructor(public alertController: AlertController, public postService: PostService, private router: Router, public toastController: ToastController, public userService: UserService, public authService: AuthService) { }

  ngOnInit() {
   /* this.getPostOwner();
    this.checkIfUserIsModerator();
    this.checkIfIsLiked();
    console.log(this.post); */
  }

  toggleLikePost() {
    if (!localStorage.getItem('my_id')) {
      this.router.navigate(['/start']);
    } else {
    if (this.heartFull) {
      this.authService.dislikePost(this.post.id).subscribe((res) => {
        console.log(res);
        this.heartFull = !this.heartFull;
      });
    } else {
      this.authService.likePost(this.post.id).subscribe((res) => {
        console.log(res);
        this.heartFull = !this.heartFull;
      });
    }
  }
  }

  getPostOwner() {
    if (!this.postOwner) {
      this.userService.showUser(this.post.user_id).subscribe((res) => {
        this.postOwner = res.user;
        this.checkIfUserIsModerator();
        this.checkIfIsLiked();
      });
    }
  }

  checkIfIsLiked() {
    if (this.loggedUser) {
        this.userService.listLikes(this.loggedUser).subscribe((res) => {
          res.likes.forEach(post => {
            console.log(post.post_id, this.post.id, 'aqui');
            if (post.post_id == localStorage.getItem('post_id')) {
              this.heartFull = true;
            }
          });
        });
    }
  }

  async openPostOptions() {
    if (this.post.user_id == this.loggedUser || this.userIsModerator) {
      const alert = await this.alertController.create({
        header: 'Opções de post',
        buttons: [
          {
            text: 'Deletar post',
            handler: () => { this.deletePost() }
          },
          {
            text: 'Editar post',
            handler: () => {
              localStorage.setItem('post_id', this.post.id);
              this.router.navigate(['/edit-post']);
            }
          },

          {
            text: 'Cancelar',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Opções de post',
        buttons: ['Denunciar', 'Cancelar']
      });
      await alert.present();
    }
  }

  openPostOwnerProfile() {
    localStorage.setItem('user_id', this.post.user_id);
    console.log(this.post.user_id);
    this.router.navigate(['/profile']);
  }

  openFullPost() {
    localStorage.setItem('post_id', this.post.id);
    this.router.navigate(['/full-post']);

  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe((res) => {
      this.showSuccessToast();
      this.router.navigate(['/tabs/home']);
    });
  }

  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Post deletado.',
      duration: 2000
    });
    toast.present();
  }

  checkIfUserIsModerator() {
    if (this.loggedUser) {
      this.userService.showUser(localStorage.getItem("my_id")).subscribe((res) => {
        if (res.user.identifier == 1) {
          this.userIsModerator = true;
        }
      });
    }
  }

}