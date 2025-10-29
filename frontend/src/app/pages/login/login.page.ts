import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
//inyectar servicios
  private authService = inject(AuthService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  constructor() {}

  async onSubmit(form: NgForm) {
    //validacion
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    //cargando
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...'
    });
    await loading.present();
    try{
      // obtener datos del formulario
      const email = form.value.email;
      const password = form.value.password;

      // llamar authService
      await firstValueFrom(this.authService.login(email, password));

      //Exito
      await loading.dismiss();

      //volver a home
      this.navCtrl.navigateRoot('/search');
    }
    catch (err: any) {
      //ocultar cargando
      await loading.dismiss();
      //mostrar error
      const message = err.error?.message || 'Error al iniciar sesión. Inténtalo de nuevo.';
      this.presentToast(message, 'danger');
    }
  }

  //helper para mostrar toast
  private async presentToast(message: string, color: 'success' | 'warning' |'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}
