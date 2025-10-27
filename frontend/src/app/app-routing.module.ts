import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'search',
        loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
      {
        path: 'new',
        loadChildren: () => import('./pages/new/new.module').then( m => m.NewPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorPageModule)
  },
  { path: '**', redirectTo: '404' },   
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
