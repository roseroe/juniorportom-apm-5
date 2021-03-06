import { Component } from '@angular/core';
import { Product } from '../model/product';
import {ProductService} from "../service/product.service";

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //templateUrl: 'app/templates/product-list.html',
  providers: [ProductService]
})
export class HomePage {
	title: string = "los productos del Año";

    selected: Product;

    products: Product[];

  constructor( public navCtrl: NavController, private productService: ProductService) {
    
  }

  getProducts() {
        this.productService.getProducts()
            .subscribe(
            products => {
                this.products = products;
            },

            error => {
                console.log(error);
            }
        );
    }

    ngOnInit(): void {
        this.getProducts();
    }

    onSelect(product: Product){
        this.selected = product;
        this.navCtrl.push('product-detail.html', {id:number => this.selected.id});
        
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.productService.create(name)
            .subscribe(product => {
                this.products.push(product);
                this.selected = null;
            });
    }
}








     


    

