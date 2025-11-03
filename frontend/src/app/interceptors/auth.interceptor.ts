
import {inject} from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);
    // Obtener el token del AuthService
        const token = authService.getToken();

        //Si  existe el token
        if (token) {
            // Clonar la solicitud y agregar el encabezado de autorización
            const cloneReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        // Enviar la peticion clonada
            return next(cloneReq);
        }
        // Si no hay token, enviar la solicitud original
        return next(req);
}