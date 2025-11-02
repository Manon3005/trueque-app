import { ToastController } from "@ionic/angular";

export async function presentToast(toastCtrl: ToastController, message: string, color: 'success' | 'warning' |'danger') {
    const toast = await toastCtrl.create({
      message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }