import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/role.enum';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private navCtrl = inject (NavController); 

  productList: any[] = [];
  visibleProductList: any[] = [];
  isAdmin: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isAdmin = this.authService.getCurrentUserRole()?.toString() === 'ADMIN';
    this.productService.getAll().subscribe({
      
      next: (response: any) => {
        // Verificamos que la respuesta sea la esperada
        if (response && response.data && Array.isArray(response.data.products)) {
          
          this.productList = response.data.products.map((product: any) => { 
            return {
              id: product.id,
              title: product.title,
              firstImage: product.images[0],
              state: product.state,
              location: product.location,
              antiquity: this.timeago(product.created_at)
            }
          });
          
          this.visibleProductList = this.productList;

        } else {
          console.error('La respuesta del backend no tiene el formato esperado.', response);
          this.productList = [];
          this.visibleProductList = [];
        }
      },
      error: (err: any) => {
        console.error('Error al cargar los productos!', err);
        this.productList = [];
        this.visibleProductList = [];
      }
    });
  }
  
  filtrarLista(event: any) {
    const research = event.target.value.toLocaleLowerCase();
    this.visibleProductList = this.productList.filter((product) => product.title.toLocaleLowerCase().includes(research));
  }

  //funcion para calcular tiempo de publicacion
  timeago(dateString: string): string {
    if (!dateString) return '';

    const date= new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      return "hace " + Math.floor(interval) + (Math.floor(interval) === 1 ? " año" : " años");
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return "hace " + Math.floor(interval) + (Math.floor(interval) === 1 ? " mes" : " meses");
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return "hace " + Math.floor(interval) + (Math.floor(interval) === 1 ? " día" : " días");
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return "hace " + Math.floor(interval) + (Math.floor(interval) === 1 ? " hora" : " horas");
    }
    interval = seconds / 60;
    if (interval > 1) {
      return "hace " + Math.floor(interval) + (Math.floor(interval) === 1 ? " minuto" : " minutos");
    }
    return "hace " + Math.floor(seconds) + " segundos";
  }

  goToAdminPage() {
    this.navCtrl.navigateRoot('/admin');
  }
}
