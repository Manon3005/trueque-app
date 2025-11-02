import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { State } from '../../models/state';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit {
  productList: any[] = [];
  visibleProductList: any[] = [];
  private productService = inject(ProductService);
  constructor() { }

// src/app/pages/search/search.page.ts

  ngOnInit() {
    this.productService.getAll().subscribe({
      
      next: (response: any) => {
        console.log('Productos recibidos!', response);
        // Verificamos que la respuesta sea la esperada
        if (response && response.data && Array.isArray(response.data.products)) {
          
          this.productList = response.data.products.map((product: any) => { 

            const firstImageBuffer = product.images?.[0]?.content;

            return {
              id: product.id,
              title: product.title,
              firstimage: this.buffeToDataURL(firstImageBuffer),
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

  buffeToDataURL(bufferObject: any): string | null {
    if (!bufferObject || bufferObject.type !== 'Buffer' || !Array.isArray(bufferObject.data)){
      return null;
    }
    const byteArray = new Uint8Array(bufferObject.data);
    
    let binaryString = '';
    byteArray.forEach((byte) => {
      binaryString += String.fromCharCode(byte);
    });
    const base64String = btoa(binaryString);
    return `data:image/png;base64,${base64String}`;
  }

}
