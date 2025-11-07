import { Component, computed, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { presentToast } from 'src/app/utils/present-toast';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  private navCtrl = inject (NavController);

  user = computed(() => this.data()?.['user'] as Partial<User> ?? {});
  userProducts = computed(() => this.data()?.['userProducts'] as Product[] ?? []);

  @ViewChild('filePicker') filePicker!: ElementRef<HTMLInputElement>;
  avatarUrl: string = 'assets/avatar.svg';

  constructor() { }

  ngOnInit() {
    if (this.user().picture != undefined) {
      this.avatarUrl = this.user().picture!;
    }
  }

  chooseImage() {
    this.filePicker.nativeElement.click();
  }

  async onFileSelected(event: any) {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.userService.updatePicture(file).subscribe();
      presentToast(this.toastCtrl, "Avatar actualizado", "success");
    } catch (err: any) {
      presentToast(this.toastCtrl, "Error al actualizar el avatar", "danger");
    }
  }

  async onUpdateUsername(value: string) {
    try {
      await firstValueFrom(this.userService.updateUser({
        email: this.user().email,
        username: value,
        region: this.user().region,
        city: this.user().city,
      }));
      presentToast(this.toastCtrl, "Nombre de usuario actualizado", "success");
    } catch (err: any) {
      presentToast(this.toastCtrl, "Error al actualizar el nombre de usuario", "danger");
    } 
  }

  async onUpdateEmail(value: string) {
    try {
      await firstValueFrom(this.userService.updateUser({
        email: value,
        username: this.user().username,
        region: this.user().region,
        city: this.user().city,
      }));
    } catch (err: any) {
      presentToast(this.toastCtrl, "Error al actualizar el correo electrónico", "danger");
    } 
  }

  async onUpdateRegion(value: string) {
    try {
      await firstValueFrom(this.userService.updateUser({
        email: this.user().email,
        username: this.user().username,
        region: value,
        city: this.user().city,
      }));
      presentToast(this.toastCtrl, "Región actualizada", "success");
    } catch (err: any) {
      presentToast(this.toastCtrl, "Error al actualizar la región", "danger");
    }
  }

  async onUpdateCity(value: string) {
    try {
      await firstValueFrom(this.userService.updateUser({
        email: this.user().email,
        username: this.user().username,
        region: this.user().region,
        city: value,
      }));
      presentToast(this.toastCtrl, "Comuna actualizada", "success");
    } catch (err: any) {
      presentToast(this.toastCtrl, "Error al actualizar la comuna", "danger");
    }
  }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, eliminar',
          role: 'confirm',
          handler: () => {
            this.deleteAccount();
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteAccount() {
    try {
      await firstValueFrom(this.userService.delete());
      this.logout();
    } catch (err: any) {
      presentToast(this.toastCtrl, "Error al eliminar cuenta", "danger");
    }
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }

  ngOnDestroy() {
    if (this.avatarUrl != 'assets/avatar.svg') {
      URL.revokeObjectURL(this.avatarUrl);
    }
  }
}
