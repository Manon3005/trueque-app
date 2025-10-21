import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false
})
export class SignupPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const rut = form.value.rut;
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    const region = form.value.region;
    const city = form.value.city;

    //TODO: llamar a servicio de creación de cuenta
  }
}
