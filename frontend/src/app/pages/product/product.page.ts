import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { State } from 'src/app/models/state';
import { ProductService } from 'src/app/services/product.service';
import { presentToast } from 'src/app/utils/present-toast';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';

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
  private productService = inject(ProductService);

  product = computed(() => this.data()?.['product'] as Partial<Product> ?? {});
  icon: string = "";

  constructor() { }

  ngOnInit() {
    if (this.product().isFavorite == true) {
      this.icon = "heart";
    } else {
      this.icon = "heart-outline";
    }
  }

  onProgress(event: CustomEvent<[Swiper, number]>) {
    const [swiper, progress] = event.detail;
    console.log(progress);
  }

  onSlideChange() {
    console.log('slide changed');
  }

  setFavorite() {
    try {
      if (this.icon == "heart-outline") {
        this.productService.toggleFavorite(this.product().id!, true).subscribe();
        presentToast(this.toastCtrl, "Producto marcado como favorito", "success");
        this.icon = "heart"
      } else {
        this.productService.toggleFavorite(this.product().id!, false).subscribe();
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

}
