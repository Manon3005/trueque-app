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
        loadChildren: () => import('./pages/create-ad/create-ad.module').then( m => m.CreateAdPageModule)
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
    path: 'detail',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/edit-ad/edit-ad.module').then( m => m.EditAdPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorPageModule)
  },
  { path: '**', redirectTo: '404' } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
