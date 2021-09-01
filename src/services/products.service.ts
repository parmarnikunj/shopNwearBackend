import bcrypt from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import productModel from '@/models/products.model';
import { Product } from '@/interfaces/products.interface';

class ProductService {
  static importProducts() {
    const fs = require('fs');
    const csv = require('csv-parser');
    
    fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data',(row) => {
      productModel.push(row)
    })
    .on('end',() => {
      console.log("done")
    });
    
  }
  public products = productModel;
  
  public async findAllPoductByGender(
    genderQuery: string,
    limit: number = 100,
    page: number= 1): Promise<Product[]> {
    return this
    .products
    .filter(p => p.gender === genderQuery)
    .slice((page-1)*limit, page*limit)
    
  }
  public async findAllProductsBySalePrice(
    salesPriceQeury: string,
    limit:number=100,
    page:number =1
    ): Promise<Product[]> {
    return this
    .products
    .filter(p => p.sale_price === salesPriceQeury) 
    .slice((page-1)*limit, page*limit)
  }
  public async findAllProducts(
    limit:number=100,
    page:number=1): Promise<Product[]> {
    const products: Product[] = this.products;
    return products
    .slice((page-1)*limit, page*limit);
  }

  public async findProductById(gtin: string): Promise<Product> {
    const foundProduct: Product = this.products.find(product => product.gtin === gtin);
    if (!foundProduct) throw new HttpException(409, "You're not user");

    return foundProduct;
  }

  
}

export default ProductService;
