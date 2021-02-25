import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit {
//tags variables
  tags: Array<string> = [];
  tagValue: string = '';
//input file variables
  uploadImage: any = '';
  mediaStateText: string = "Selecione uma mídia.";

  postId: string = localStorage.getItem('post_id');

  postDefaultValues: any = {
    title: '',
    text: ''
  };

  editPostForm: FormGroup;

  constructor(public formbuilder: FormBuilder, public postService: PostService, public router: Router, public toastController: ToastController) {
    this.editPostForm = this.formbuilder.group({
      title: [null, [Validators.required]],
      text: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    //set ion-input initial values
    /*this.postService.showPost(this.postId).subscribe((res) => {
      this.postDefaultValues = res.post;
      //set default image
      if (res.post.media) {
        this.editPostForm.value.media = res.post.media;
        this.uploadImage = res.post.media;
        this.mediaStateText = "1 mídia selecionada.";
      }
      //set default tags
      if (res.post.tags) {
        this.editPostForm.value.tags = res.post.tags;
        this.tags = res.post.tags;
      }

    }); */

    //set ion-input initial values (show purposes)
    this.postDefaultValues = {
      title: 'Houseplants: estilo de decoração',
      text: 'Amo.'
    };
    this.tags = ['SUCULENTAS','CASA'];
        
  }

//adds entered image to form
  addAditionalInfoToForm(editPostForm) {
    editPostForm.value.media = this.uploadImage;
    editPostForm.value.tags = this.tags; 
  }

//adds tag from ion-input to tags Array 
  addTag() {
    let valueToBeAdded = this.tagValue.toUpperCase();
    if (valueToBeAdded && !this.tags.includes(valueToBeAdded)) {
      this.tags.push(valueToBeAdded);
    }
    this.tagValue = "";
  }

//handle changes in input file - stores url of the recently entered image at uploadedImageUrl 
  handleInputFileChange($event) {
    const reader = new FileReader();
    reader.onload = ($event) => {
      this.uploadImage = $event.target.result;
      this.mediaStateText = "1 mídia selecionada.";
    }
   reader.readAsDataURL($event.target.files[0]);
  }
//delete tag from array tags
  deleteTag(event) {
    const tag = event.target.innerText;
    const indexOfTag = this.tags.indexOf(tag);
    this.tags.splice(indexOfTag, 1);
  }

  submitEditPost(editPostForm) {
    this.addAditionalInfoToForm(editPostForm);
    this.postService.updatePost(this.postId, editPostForm.value).subscribe((res) => {
      this.router.navigate(['/']);
      this.showSuccessToast();
    });
  }

  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Post alterado com sucesso.',
      duration: 2000
    });
    toast.present();
  }

}
