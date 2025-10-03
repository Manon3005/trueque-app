import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
  standalone: false,
})
export class ErrorPage {
  @Input() code: string = '404';
  @Input() title: string = 'Error';
  @Input() message: string = 'Página no encontrada';
  @Input() buttonText: string = 'Volver al inicio';
  @Input() buttonLink: string = '/';

  constructor(private router: Router) {}

  goHome() {
    this.router.navigateByUrl(this.buttonLink);
  }
}
