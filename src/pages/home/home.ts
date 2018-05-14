import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public wc: WoocommerceProvider) {}

  async ionViewDidEnter() {
    this.wc.getProducts()
      .then(data => console.log(data))
      .catch(e => console.log(JSON.stringify(e)));
  }

}
