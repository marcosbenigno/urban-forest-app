import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../app/services/post/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  tags: any = [];
  tagValue: string = '';
  uploadImage: any = '';
  mediaState: string = "Selecione uma mídia.";
  userId: string = localStorage.getItem('my_id');
  newPostForm: FormGroup;

  constructor(public formbuilder: FormBuilder, public postService: PostService, private router: Router) {
    this.newPostForm = this.formbuilder.group({
      title: [null, [Validators.required]],
      text: [null, [Validators.required]],
    });
  }

  ngOnInit() {
  }
//adiciona tags, imagem e usuário ao form
  addAditionalInfoToForm(newPostForm) {
    newPostForm.value.media = this.uploadImage;
    newPostForm.value.tags = this.tags;
    newPostForm.value['user_id'] = this.userId; 
  }

  addTag() {
    let valueToBeAdded = this.tagValue.toUpperCase();
    if (valueToBeAdded && !this.tags.includes(valueToBeAdded)) {
    this.tags.push(valueToBeAdded);
    }
    this.tagValue = "";
  }

  updateBackground($event) {
    const reader = new FileReader();
    reader.onload = ($event) => {
      this.uploadImage = $event.target.result;
      this.mediaState = "1 mídia selecionada."
    }

   reader.readAsDataURL($event.target.files[0]);
}

  deleteTag(event) {
    const tag = event.target.innerText;
    const indexOfTag = this.tags.indexOf(tag);
    this.tags.splice(indexOfTag, 1);
  }

  submitNewPost(newPostForm) {
    this.addAditionalInfoToForm(newPostForm);
    this.postService.createPost(newPostForm.value).subscribe((res) => {
      this.router.navigate(['/tabs/home']);
    });
  }

}
