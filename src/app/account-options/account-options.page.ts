import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../app/services/user/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account-options',
  templateUrl: './account-options.page.html',
  styleUrls: ['./account-options.page.scss'],
})
export class AccountOptionsPage implements OnInit {

  uploadedImageUrl: any = '';
  myId: any = localStorage.getItem('my_id');
  userDefaultValues: any = {
    name: '',
    bio: '',
    nickname: '',
    email: ''
  };;
  accountOptionsForm: FormGroup;

  constructor(public formbuilder: FormBuilder, public userService: UserService, public router: Router, public toastController: ToastController) {
    this.accountOptionsForm = this.formbuilder.group({
      name: [null],
      bio: [null],
      nickname: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    //set ion-input initial values
    this.userService.showUser(this.myId).subscribe((res) => {
      this.userDefaultValues = res.user;
      //set default image
      if (res.user.profile_picture) {
        this.accountOptionsForm.value.profile_picture = res.user.profile_picture;
        this.uploadedImageUrl = res.user.profile_picture;
      }
  });
}

//handle changes in input file - stores url of the recently entered image at uploadedImageUrl 
  handleInputFileChange($event) {
    const reader = new FileReader();
    reader.onload = ($event) => {
      this.uploadedImageUrl = $event.target.result;
    }
    reader.readAsDataURL($event.target.files[0]);
  }

//adds entered image to form
  addAditionalInfoToForm(newPostForm) {
    newPostForm.value.profile_picture = this.uploadedImageUrl;
  }



  submitAccountOptionsForm(accountOptionsForm) {
    this.addAditionalInfoToForm(accountOptionsForm);
    this.userService.updateUser(this.myId, accountOptionsForm.value).subscribe((res) => {
      this.router.navigate(['/tabs/profile']);
      this.showSuccessToast();
    });
  }

  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Opções de conta alteradas com sucesso.',
      duration: 2000
    });
    toast.present();
  }

}
