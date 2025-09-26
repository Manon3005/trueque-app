import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';

@NgModule({
  declarations: [InputComponent, HeaderComponent, TabsComponent, ProductCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [InputComponent, HeaderComponent, TabsComponent, ProductCardComponent]
})
export class SharedModule { }
