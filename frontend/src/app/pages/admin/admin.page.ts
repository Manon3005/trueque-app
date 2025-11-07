import { Component, inject, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { presentToast } from 'src/app/utils/present-toast';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage implements OnInit {
  private userService = inject(UserService);
  private productService = inject(ProductService);
  private pageSize = 5;
  private toastCtrl = inject(ToastController);
  private navCtrl = inject(NavController);

  segmentValue = 'userList';
  usersList: Partial<User>[] = [];
  productsList: Partial<Product>[] = [];

  pageUser = 1;
  pageProduct = 1;

  totalPageUser = 0;
  totalPageProduct = 0;

  constructor() { }

  ngOnInit() {
    this.getUser();
    this.getProduct();
  }

  getUser(): void {
    try {
      this.userService.getAll(this.pageUser, this.pageSize).subscribe(data => {
        this.usersList = data.users;
        this.totalPageUser = data.totalPage;
      });
    } catch (error: any) {

    }
  }

  getProduct(): void {
    try {
      this.productService.getDenounced(this.pageProduct, this.pageSize).subscribe(data => {
        this.productsList = data.products;
        this.totalPageProduct = data.totalPage;
      });
    } catch (error: any) {

    }
  }

  async removeProduct(id: number | undefined) {
    try {
        if (id) {
          await firstValueFrom(this.productService.delete(id));
          this.productsList = this.productsList.filter(product => product.id != id);
          presentToast(this.toastCtrl, "Producto eliminado", "success");
        }
      } catch (error: any) {
        presentToast(this.toastCtrl, "Error al eliminar producto", "danger");
      }
  }

  async toggleUserStatus(id: number | undefined, is_suspended: boolean | undefined) {
    try {
      if (id && is_suspended != undefined) {
        await firstValueFrom(this.userService.updateIsSuspended(id, !is_suspended));
        this.usersList.find(user => user.id == id)!.is_suspended = !is_suspended;
        presentToast(this.toastCtrl, "Usuario actualizado", "success");
      }
    } catch (error: any) {
      presentToast(this.toastCtrl, "Error al actualizar usuario", "danger");
    }
  }

  nextUser() { 
    if (this.pageUser < this.totalPageUser) {
      this.pageUser++;
      this.getUser();
    } 
  }

  prevUser() { 
    if (this.pageUser > 1) {
      this.pageUser--;
      this.getUser(); 
    }
  }

  nextProduct() { 
    if (this.pageProduct < this.totalPageProduct) {
      this.pageProduct++; 
      this.getProduct();
    }
  }

  prevProduct() { 
    if (this.pageProduct > 1) {
      this.pageProduct--;
      this.getProduct();
    }
  }

  goToProductPage(id: number | undefined, event: Event) {
    event.preventDefault();
    if (id) this.navCtrl.navigateRoot(`/product/${id}`);
  }
}
