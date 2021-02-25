import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
// view password component variables
  viewPassword: boolean = false;
  inputTypePassword: string = "password";

  loginForm: FormGroup;

  constructor(public formbuilder: FormBuilder, public authService: AuthService, public toastController: ToastController, public router: Router) {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
  }


  loginUser(loginForm) {
    this.authService.loginUser(loginForm.value).subscribe(async (res) => {
      console.log(res);
      if (res.status == 200) {
        const userId = res.body.data.user.id;
        const userToken = res.body.data.token;
        this.router.navigate(['/tabs/home']);

        this.loginForm.reset();
        
        localStorage.setItem('my_id', userId);
        localStorage.setItem('my_token', userToken);

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

  setMyIdToLocalStorage(id) {
    
  }
//toggles ion-input type to text and password
  changeViewPasswordState() {
   if (this.inputTypePassword === "password") {
    this.inputTypePassword = "text";
   } else {
    this.inputTypePassword = "password";
   }
    this.viewPassword = !this.viewPassword;
  }

  
}
