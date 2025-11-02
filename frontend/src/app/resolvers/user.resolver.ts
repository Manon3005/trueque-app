import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.interface';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

export const userResolver: ResolveFn<Partial<User>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(UserService);
    return userService.get();
};

export const userProductsResolver: ResolveFn<Product[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const productService = inject(ProductService);
    return productService.getFromUser();
};