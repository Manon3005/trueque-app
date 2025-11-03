import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { ProductService, ProductCreationPayload } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { State, StateLabel } from '../../models/state';
import { presentToast } from 'src/app/utils/present-toast';

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
      presentToast(this.toastCtrl, 'Por favor, complete todos los campos correctamente', 'warning');
      return;
    }

    if (this.imageFiles.length == 0) {
      presentToast(this.toastCtrl, 'Por favor, agregue al menos una imagen', 'warning');
      return;
    }
    //mostrar cargando
    const loading = await this.loadingCtrl.create({ message: 'Publicando...' });
    await loading.present();

    try {
      const stateAsNumber = this.form.value.state;
      const stateAsString = State[stateAsNumber];
      //crear payload
      const payload: ProductCreationPayload = {
        title: this.form.value.title,
        description: this.form.value.description,
        state: stateAsString as any,
        location: this.form.value.location,
      };
      //llamar al mensajero de servicio
      const newProduct = await firstValueFrom(this.productService.createProduct(payload, this.imageFiles));
      //exito
      await loading.dismiss();
      await presentToast(this.toastCtrl, 'Producto publicado con éxito.', 'success');
      //navegar a account para ver productos
      this.navCtrl.navigateRoot(`/product/${newProduct.id}`);
    }
    catch (error) {
      //error
      presentToast(this.toastCtrl, 'Error al publicar el producto. Inténtalo de nuevo.', 'danger');
    }
  }
}
