import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../models/product';
import { State } from '../../models/state';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  product?: Product;
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductos().subscribe((products) => {
        const prod = products.find((p) => p.id === Number(productId));
        if (prod) {
          this.product = {
            id: prod.id,
            title: prod.title.length > 25 ? prod.title.slice(0, 25) : prod.title,
            images: [prod.image],
            descripcion: prod.description,
            state: State.NUEVO,
            location: 'Unknown',
          };
        }
      });
    }
  }
}
