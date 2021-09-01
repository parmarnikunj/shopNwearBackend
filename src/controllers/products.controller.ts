import { NextFunction, Request, Response } from 'express';
import productService from '@services/products.service';
import { Product } from '@/interfaces/products.interface';

class ProductController {
  public productService = new productService();

  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const genderQuery = req.query.gender;
      const salesPriceQeury = req.query.sale_price;
      var findAllProductData;  
      if(genderQuery) {
        console.log(`with gender query parameter: ${genderQuery}`)
        findAllProductData = await this.productService.findAllPoductByGender(genderQuery.toString());
      } else if(salesPriceQeury) {
        console.log(`with sales query parameter: ${salesPriceQeury}`)
        findAllProductData = await this.productService.findAllProductsBySalePrice(salesPriceQeury.toString());
      } else {
        findAllProductData = await this.productService.findAllProducts();
      }
      //const findAllProductData: Product[] = await this.productService.findAllProducts();
      res.status(200).json({ data: findAllProductData, message: 'findAll' });

    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productGtin = String(req.params.id);
      const findOneProductData: Product = await this.productService.findProductById(productGtin);

      res.status(200).json({ data: findOneProductData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
