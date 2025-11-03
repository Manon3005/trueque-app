import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, Router, RouteReuseStrategy, withNavigationErrorHandler } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot({
      animated: false
    }), 
    AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideHttpClient(withInterceptors([authInterceptor]),),
    provideRouter(routes, withNavigationErrorHandler((error) => {
      const router = inject(Router);
      router.navigate(['/404']); //TODO: create an error page
    }))
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
