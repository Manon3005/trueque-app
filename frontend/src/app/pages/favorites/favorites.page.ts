import { Component, computed, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { State } from '../../models/state';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  private navCtrl = inject (NavController);

  products = computed(() => this.data()?.['products'] as Product[] ?? []);

  constructor() { }

  ngOnInit() {
  }

}
