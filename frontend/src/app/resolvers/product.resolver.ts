import { inject, Injectable } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

export const favoriteProductResolver: ResolveFn<Partial<Product[]>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const productService = inject(ProductService);
    return productService.getUserFavorite();
};

export const getProductResolver: ResolveFn<Partial<Product>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const productService = inject(ProductService);
    return productService.getById(route.params['id']);
};