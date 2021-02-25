import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  viewPassword: boolean = false;
  inputTypePassword: string = "password";
  signUpForm: FormGroup;

  constructor(public formbuilder: FormBuilder, public authService: AuthService, public router: Router, public toastController: ToastController) {
    this.signUpForm = this.formbuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [[null], [Validators.required, Validators.minLength(4)]],
      nickname: [null, [Validators.required, Validators.minLength(4)]],
      repeatPassword: [[null], [Validators.required, Validators.minLength(4)]]
    },
    {validator: this.passwordValidator});
  }

  addAdditionalDataToForm() {
    this.signUpForm.value.name = this.signUpForm.value.nickname;
    this.signUpForm.value.identifier = 0;
  }

  signUpNewUser(signUpForm) {
    this.addAdditionalDataToForm();
    this.authService.registerUser(signUpForm.value).subscribe(async (res) => {
      console.log(res);

      if (res.status == 200) {

        this.router.navigate(['/login']);

        const toast = await this.toastController.create({
          message: 'Cadastrado! Realize login para a experiência completa.',
          duration: 2000
        });
        toast.present();
        
        this.signUpForm.reset();

      } else {
        const toast = await this.toastController.create({
          message: 'Erro! Tente novamente!',
          duration: 2000
        });
        toast.present();
      }
    },
    async (err) => {
      const toast = await this.toastController.create({
        message: 'Erro! Tente novamente!',
        duration: 2000
      });
      toast.present();
 	  });
  }

  passwordValidator(form: FormGroup) {
    
    if (form.controls['password'].value === form.controls['repeatPassword'].value) {
      return null;
   } else {
      return {'mismatch': true};
   }
  }

  ngOnInit() {
  }

  changeViewPasswordState() {
    if (this.inputTypePassword === "password") {
     this.inputTypePassword = "text";
    } else {
     this.inputTypePassword = "password";
    }
     this.viewPassword = !this.viewPassword;
   }
  

}
