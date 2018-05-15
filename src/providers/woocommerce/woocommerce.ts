import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

@Injectable()
export class WoocommerceProvider {
  woocommerce: any;
  products: any[];
  categories: any[];

  constructor() {
    this.woocommerce = WC({
      wpAPI: true,
      version: 'wc/v2',
      queryStringAuth: true
    });
  }

  async getProducts(){
    try{
      if(!this.products){
        const data = await this.woocommerce.getAsync('products?per_page=30');
        this.products = JSON.parse(data.body);
      };
      return this.products;
    } catch(e){
      throw(e);
    }
  }

  async getCategories(){
    try{
      if(!this.categories) {
        const data = await this.woocommerce.getAsync('products/categories')
        this.categories = JSON.parse(data.body);
      }
      return this.categories;
    }catch(e) {
      throw(e);
    }
  }

}
