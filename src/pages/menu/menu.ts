import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {

  homePage: any;
  categories: any[];
  @ViewChild(Nav) nav: Nav;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private wc: WoocommerceProvider) {
    this.homePage = HomePage;
  }

  async ngOnInit(){
    try{
      const categories: any[] = await this.wc.getCategories();
      this.categories = categories.map(c => {
        const icon = (c.name === 'Productos') ? 'pricetag' : 'color-wand';
        return {...c, icon };
      });

    } catch(e) {
      console.log(JSON.stringify(e));
    }
  }

  openPage(category: string) {
    this.nav.setRoot(HomePage, { category });
  }

}
