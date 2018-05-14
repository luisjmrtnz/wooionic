import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

@Injectable()
export class WoocommerceProvider {
  woocommerce: any;
  constructor() {
    this.woocommerce = WC({
      wpAPI: true,
      version: 'wc/v2',
      queryStringAuth: true
    });
  }

  async getProducts(){
    try{
      const data = await this.woocommerce.getAsync('products');
      return JSON.parse(data.body);
    } catch(e){
      throw(e);
    }
  }

}
