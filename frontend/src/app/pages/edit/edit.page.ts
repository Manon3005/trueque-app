import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/app/models/product';
import { State } from 'src/app/models/state';
import { ProductCreationPayload, ProductService } from 'src/app/services/product.service';
import { presentToast } from 'src/app/utils/present-toast';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: false
})
export class EditPage implements OnInit {
  //propiedades
  form: FormGroup;
  imageFiles: File[] = [];
  //imagenes en base64
  imagePreviews: string[] = [];
  maxImages = 9

  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private loadingCtrl = inject(LoadingController);

  product = computed(() => this.data()?.['product'] as Partial<Product> ?? {});
  icon: string = "";

  constructor() { 
    this.form = this.formBuilder.group({
      title: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", [Validators.required, Validators.maxLength(1000)]],
      state: [State.NEW, Validators.required],
      location: ["", [Validators.required, Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    const p = this.product();

    const stateNumber = State[p.state as keyof typeof State];

    this.form.patchValue({
      title: p.title,
      description: p.description,
      state: stateNumber,
      location: p.location,
    });

    this.imagePreviews = [];
    this.imageFiles = [];

    const backendImages = p.images ?? [];
    backendImages.forEach((dataUrl: string | null, idx: number) => {
      if (!dataUrl) return;
      this.imagePreviews.push(dataUrl);

      const extension = (dataUrl.split(';')[0].split('/')[1] || 'png').replace('+xml','png');
      const filename = `backend-image-${idx}.${extension}`;
      const file = this.dataURLtoFile(dataUrl, filename);
      this.imageFiles.push(file);
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
    if (this.form!.invalid) {
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
      const stateAsNumber = this.form!.value.state;
      const stateAsString = State[stateAsNumber];
      //crear payload
      const payload: ProductCreationPayload = {
        title: this.form!.value.title,
        description: this.form!.value.description,
        state: stateAsString as any,
        location: this.form!.value.location,
      };

      //llamar al mensajero de servicio
      const newProduct = await firstValueFrom(this.productService.update(this.product().id!, payload, this.imageFiles));
      //exito
      await loading.dismiss();
      await presentToast(this.toastCtrl, 'Producto modificado con éxito.', 'success');
      //navegar a la pagina del producto
      this.navCtrl.navigateRoot(`/product/${newProduct.id}`);
    }
    catch (error) {
      //error
      presentToast(this.toastCtrl, 'Error al modificar el producto. Inténtalo de nuevo.', 'danger');
    }
  }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este producto? Esta acción es irreversible.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, eliminar',
          role: 'confirm',
          handler: () => {
            this.deleteProduct();
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteProduct() {
    const loading = await this.loadingCtrl.create({ message: 'Eliminando...' });
    await loading.present();
    try {
      await firstValueFrom(this.productService.delete(this.product().id!));
      loading.dismiss();
      presentToast(this.toastCtrl, "Producto eliminado con éxito.", "success");
      this.navCtrl.navigateRoot(`/search`);
    } catch (err: any) {
      presentToast(this.toastCtrl, "Error al eliminar producto", "danger");
    }
  }

  private dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/data:(.*);base64/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}
