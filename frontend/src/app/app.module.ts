import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

//-- ¡IMPORTACION INTERCEPTOR! --
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot({
      animated: false
    }), 
    AppRoutingModule,
    HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
