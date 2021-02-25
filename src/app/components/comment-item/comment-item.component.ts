import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CommentService } from 'src/app/services/comment/comment.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {

  @Input() comment: any;
  //output emiiter pra atualizar lista de comments

  userIsModerator: boolean = false;
  loggedUser: any = localStorage.getItem('my_id');

  selectedCommentId: string = '';

  constructor(public alertController: AlertController, public toastController: ToastController, public userService: UserService, public commentService: CommentService) { }

  ngOnInit() {
    this.checkIfUserIsModerator();
  }

  async openCommentOptionsAlert() {
    if (this.comment.user_id == this.loggedUser || this.userIsModerator) {
      const alert = await this.alertController.create({
        header: 'Opções de comentário',
        buttons: [{
          text: 'Deletar comentário',
          handler: () => { this.deleteComment() }
        }, 
        'Denunciar comentário']
      });
      await alert.present();
    } else {
        const alert = await this.alertController.create({
          header: 'Opções de comentário',
          buttons: ['Denunciar comentário']
        });
        await alert.present();
    }

  }

  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Comentário deletado com sucesso.',
      duration: 2000
    });
    toast.present();
  }

  checkIfUserIsModerator() {
    this.userService.showUser(localStorage.getItem("my_id")).subscribe((res) => {
      if (res.user.identifier == 1) {
        this.userIsModerator = true;
      }
    });
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment.id).subscribe((res) => {
      this.showSuccessToast();
      //todo: sevent emitter
    });
  }

}
