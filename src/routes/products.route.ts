import { Router } from 'express';
import ProductController from '@controllers/products.controller';
import { Routes } from '@interfaces/routes.interface';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productController.getProducts);
    this.router.get(`${this.path}/:id(\\d+)`, this.productController.getProductById);
  }
}

export default ProductsRoute;
