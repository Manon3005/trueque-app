
import {Injectable, inject} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Obtener el token del AuthService
        const token = this.authService.getToken();

        //Si  existe el token
        if (token) {
            // Clonar la solicitud y agregar el encabezado de autorización
            const cloneReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        // Enviar la peticion clonada
            return next.handle(cloneReq);
        }
        // Si no hay token, enviar la solicitud original
        return next.handle(req);
    }
}