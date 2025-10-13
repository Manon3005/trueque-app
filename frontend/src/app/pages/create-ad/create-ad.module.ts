import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAdPageRoutingModule } from './create-ad-routing.module';

import { CreateAdPage } from './create-ad.page';
import { SharedModule } from 'src/app/modules/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAdPageRoutingModule,
    SharedModule
  ],
  declarations: [CreateAdPage]
})
export class CreateAdPageModule {}
