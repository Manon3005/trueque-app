import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAdPageRoutingModule } from './edit-ad-routing.module';

import { EditAdPage } from './edit-ad.page';
import { SharedModule } from 'src/app/modules/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAdPageRoutingModule,
    SharedModule
  ],
  declarations: [EditAdPage]
})
export class EditAdPageModule {}
