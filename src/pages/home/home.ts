import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[];
  title: string;

  constructor(
    public wc: WoocommerceProvider,
    public params: NavParams) {
      this.title = 'Home';
    }

  async ionViewWillEnter() {
    const cat = this.params.get('category');
    try {
      const products: any[] = await this.wc.getProducts();
      if(cat) {
        this.title = cat;
        this.products = products.filter(p => p.categories[0].name === cat);
      } else {
        this.products = products;
      }
      console.log(this.products);
    } catch(e) {
      console.log(JSON.stringify(e));
    }
  }

}
