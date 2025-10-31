import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserCreationData } from '../../services/user.service';
import { Role } from '../../models/role.enum';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false
})
export class SignupPage implements OnInit {
  acceptTerms: boolean = false;

  private authService = inject(AuthService);
  private loadingController = inject(LoadingController);
  private toastController = inject(ToastController);
  private navController = inject(NavController);

  constructor() { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
  
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    //cargando
    const loading = await this.loadingController.create({
      message: 'Creando cuenta...'
    });
    await loading.present();
    //crear payload
    const payload: UserCreationData = {
     rut: form.value.rut,
     email: form.value.email,
     password: form.value.password,
     username: form.value.username,
     region: form.value.region,
     city: form.value.city,
     role: "USER" as any
    };
    //uso try catch para manejar errores
    try {
      //llamar al servicio de auth
      await firstValueFrom(this.authService.register(payload));
      //exito
      await loading.dismiss();
      await this.presentToast('¡Cuenta creada con éxito!', 'success');

      //navegar a login
      this.navController.navigateRoot('/login');

    }
    catch (error: any) {
      await loading.dismiss();
      const errorMessage = error?.error?.message || 'Error al crear la cuenta.';
      await this.presentToast(errorMessage, 'danger');
    }
  }
  private async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}
