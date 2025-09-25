import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  declarations: [InputComponent, HeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [InputComponent, HeaderComponent]
})
export class SharedModule { }
