import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
    private navCtrl: NavController,
    public params: NavParams,
    private loader: LoadingController) {
      this.title = 'Home';
    }

  async ionViewDidEnter() {
    const cat = this.params.get('category');
    const loading = this.loader.create({ content: 'Cargango Productos...' });
    loading.present();
    try {
      const products: any[] = await this.wc.getProducts();
      if(cat) {
        this.title = cat;
        this.products = products.filter(p => p.categories[0].name === cat);
      } else {
        this.products = products;
      }
      console.log(products);
      loading.dismiss();
    } catch(e) {
      console.log(JSON.stringify(e));
    }
  }

  openDetails(product: any) {
    this.navCtrl.push('DetailsPage', { product });
  }

}
