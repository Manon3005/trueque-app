import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { presentToast } from 'src/app/utils/present-toast';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { State, StateLabel } from 'src/app/models/state';

register();

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false
})
export class ProductPage implements OnInit {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  private toastCtrl = inject(ToastController);
  private navCtrl = inject (NavController);
  private alertCtrl = inject(AlertController);
  private productService = inject(ProductService);
  private authService = inject(AuthService);

  product = computed(() => this.data()?.['product'] as Partial<Product> ?? {});
  icon: string = "";
  userId: number;
  state: string = "";

  constructor() { 
    this.userId = this.authService.getCurrentUserId()!;
  }

  ngOnInit() {
    if (this.product().isFavorite == true) {
      this.icon = "heart";
    } else {
      this.icon = "heart-outline";
    }

    const enumValue = State[this.product().state as keyof typeof State];
    this.state = StateLabel.get(enumValue)!;
  }

  onProgress(event: CustomEvent<[Swiper, number]>) {
    const [swiper, progress] = event.detail;
    console.log(progress);
  }

  onSlideChange() {
    console.log('slide changed');
  }

  async setFavorite() {
    try {
      if (this.icon == "heart-outline") {
        await firstValueFrom(this.productService.toggleFavorite(this.product().id!, true));
        presentToast(this.toastCtrl, "Producto marcado como favorito", "success");
        this.icon = "heart"
      } else {
        await firstValueFrom(this.productService.toggleFavorite(this.product().id!, false));
        presentToast(this.toastCtrl, "Producto eliminado de tus favoritos", "success");
        this.icon = "heart-outline";
      }
    } catch (error: any) {
      presentToast(this.toastCtrl, "Error al marcar el producto como favorito", "danger");
    }
  }

  openDiscussionConUser() {
    this.navCtrl.navigateRoot(`/messages/${this.product().user_id}`)
  }

  navigateToModificationPage() {
    this.navCtrl.navigateRoot(`/edit/${this.product().id}`)
  }

  async confirmDenounce(event: Event) {
    event.preventDefault();
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas denunciar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, denunciar',
          role: 'confirm',
          handler: () => {
            this.denounceProduct();
          }
        }
      ]
    });
    await alert.present();
  }

  async denounceProduct() {
    try {
      await firstValueFrom(this.productService.toggleDenounce(this.product().id!, true));
      presentToast(this.toastCtrl, "Producto denunciado", "success");
    } catch (error: any) {
      presentToast(this.toastCtrl, "Error al denunciar el producto", "danger");
    }
  }
}
