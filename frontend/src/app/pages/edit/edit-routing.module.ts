import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPage } from './edit.page';
import { getProductResolver } from 'src/app/resolvers/product.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: EditPage,
    resolve: {
      product: getProductResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPageRoutingModule {}
