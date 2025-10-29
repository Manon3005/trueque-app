import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { ProductService, ProductCreationPayload } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { State, StateLabel } from '../../models/state';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: false,
})
export class NewPage {
  //propiedades
  form: FormGroup;
  imageFiles: File[] = [];
  //imagenes en base64
  imagePreviews: string[] = [];
  maxImages = 9

  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  constructor() {
    // Formulario reactivo
    this.form = this.formBuilder.group({
      //[valores iniciales, validadores]
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      state: [State.NEW, Validators.required],
      location: ['', [Validators.required, Validators.maxLength(200)]],
    }); 
  }
  // Manejar la selección de imágenes
  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    for (const file of files) {
      //verificar tamaño
      if (this.imageFiles.length >= this.maxImages) break;
      //verificar tipo
      if (!file.type.startsWith('image/')) continue;
      //guardar archivo
      this.imageFiles.push(file);
      //previsualizacion
      this.previewFile(file);
    }

  }
  // generar previsualizacion de imagen
  private previewFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  // Eliminar imagen seleccionada
  removePreview(index: number) {
    this.imagePreviews.splice(index, 1);
    this.imageFiles.splice(index, 1);
  }
  // metodo principal para crear producto
  async submit() {
    //validar formulario
    if (this.form.invalid) {
      this.presentToast('Por favor, complete todos los campos correctamente.', 'warning');
      return;
    }
    //mostrar cargando
    const loading = await this.loadingCtrl.create({ message: 'Publicando...' });
    await loading.present();

    try {
      //convertir imagenes a base64
      const imageBase64 = await Promise.all(
        this.imageFiles.map(file => this.toBase64(file))
      );
      //crear payload
      const payload: ProductCreationPayload = {
        title: this.form.value.title,
        descripcion: this.form.value.description,
        state: this.form.value.state,
        location: this.form.value.location,
        images: imageBase64
      };
      //llamar al mensajero de servicio
      const newProduct = await firstValueFrom(this.productService.createProduct(payload));
      //exito
      this.presentToast('Producto publicado con éxito.', 'success');
      //navegar a account para ver productos
      this.navCtrl.navigateRoot('/account');
    }
    catch (error) {
      //error
      this.presentToast('Error al publicar el producto. Inténtalo de nuevo.', 'danger');
    }
  }
  //helpers
  // convertir archivo a base64
  private toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1]; // Obtener solo la parte base64
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  // mostrar toast
  private async presentToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color: color,
      position: 'top'
  });
    toast.present();
  }
}
