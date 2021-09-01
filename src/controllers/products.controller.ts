import { NextFunction, Request, Response } from 'express';
import productService from '@services/products.service';
import { Product, ProductQuery } from '@/interfaces/products.interface';

class ProductController {
  public productService = new productService();

  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pq : ProductQuery = req.query
      const {gender, sale_price, page = 1, limit= 100} =  pq

      var findAllProductData;  
      if(gender !== undefined) {
        console.log(`with gender query parameter: ${gender}`)
        findAllProductData = await this.productService.findAllPoductByGender(
          gender,  
          Number.parseInt(limit.toString()),
          Number.parseInt(page.toString())
          );
      } else if(! sale_price===undefined) {
        console.log(`with sales query parameter: ${sale_price}`)
        findAllProductData = await this.productService.findAllProductsBySalePrice(
          sale_price.toString(),
          Number.parseInt(limit.toString()),
          Number.parseInt(page.toString())
          );
      } else {
        findAllProductData = await this.productService.findAllProducts(
          Number.parseInt(limit===undefined?'100':limit.toString()),
          Number.parseInt(page===undefined?'1':page.toString())
        );
      }
      //const findAllProductData: Product[] = await this.productService.findAllProducts();
      res.status(200).json(findAllProductData);

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
