import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { SharedModule } from 'src/app/modules/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    SharedModule
  ],
  declarations: [ProductPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductPageModule {}
