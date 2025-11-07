import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getCurrentUserRole();

  if (role?.toString() === 'ADMIN') {
    return true;
  }
  return router.parseUrl('/search');
};
