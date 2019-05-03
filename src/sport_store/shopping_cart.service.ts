import {IItem} from '../sport_store/interface.data';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ShopService } from './Shop.service';

@Injectable()

export class ShoppingCartService {

  private _categoryArray: string[] = [];
  private _trueCategoryArray: string[] = [];
  private _cart: IItem[] = [];
  private _countCategory: number;
  private locator = (p: IItem, name: string) => p.name === name;
  private _arrayOfCost: number[] = [];
  private _fullArray: IItem[] = [];
  private _shopCartArray: IItem[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private shopService: ShopService) {
      this.shopService.serverChangeEmitter.subscribe(() => {
        this._fullArray = this.shopService.getData();
        this._arrayOfCost = this.shopService.getArrayForCost();
        for (let i = 0; i < this._fullArray.length; i++) {
          let number = this._arrayOfCost[i];
          let name = this._fullArray[i].name;
          let description = this._fullArray[i].description;
          let category = this._fullArray[i].category;
          let price = this._fullArray[i].price;
          let helpCount: IItem = {number, name, description, category, price};
          this._shopCartArray.push(helpCount);
        }
      });
  }
// getting an array from the shopping cart
  getData(): IItem[] {
    return this._cart;
  }
// getting an array of category from the shopping cart
  getCategory(): string[] {
    this._trueCategoryArray[0] = this._categoryArray[0];
    for (let i = 0; i < this._categoryArray.length; i++) {
      this._countCategory = 0;
      for (let z = 0; z < this._trueCategoryArray.length; z++) {
        if (this._trueCategoryArray[z] === this._categoryArray[i]) {
          this._countCategory++;
        }
      }
      if (this._countCategory === 0) {
        this._trueCategoryArray.push(this._categoryArray[i]);
      }
    }
    return this._trueCategoryArray;
  }
// add item in shopping cart
  addData(name: string, description: string, category: string, price: number) {
    let index = this._fullArray.findIndex(p => this.locator(p, name));
    let number = this._arrayOfCost[index];
    let HelpCount: IItem = {number, name, description, category, price};
    if (this._arrayOfCost[index] === 0) {
      this._arrayOfCost[index] = this._arrayOfCost[index] + 1;
      let number = this._arrayOfCost[index];
      let helpCount: IItem = {number, name, description, category, price};
      this._cart.push(helpCount);
    }
    else {
      this._arrayOfCost[index] = this._arrayOfCost[index] + 1;
      let index1 = this._cart.findIndex(p => this.locator(p, name));
      let number = this._arrayOfCost[index];
      this._cart[index1].number = number;
    }
    this._categoryArray.push(HelpCount.category);
    let message: string;
    if (this.shopService.getCountTranslate() === 'rus' ) {
      message = 'Товар был добавлен в корзину';
    }
    if (this.shopService.getCountTranslate() === 'en' ) {
      message = 'This item has been added in shopping _cart';
    }
    let action : string;
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
// remove item from shopping cart
  removeData(name: string) {
    let index = this._cart.findIndex(p => this.locator(p, name));
    let index1 = this._fullArray.findIndex(p => this.locator(p, name));
    if ( index > -1 ) {
      this._cart.splice(index, 1);
      this._arrayOfCost[index1] = 0;
      let message: string;
      if (this.shopService.getCountTranslate() === 'rus' ) {
        message = 'Товар был удален из корзины';
      }
      if (this.shopService.getCountTranslate() === 'en' ) {
        message = 'This item has been deleted from shopping _cart';
      }
      let action : string;
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
  }
// get number of items from the shopping cart
  getBadge() {
    let count: number;
    count = 0;
    for (let i = 0; i < this._cart.length; i++) {
      count = count + Number(this._cart[i].number);
    }
    if (count !== 0) {
      return Number(count);
    }
  }
}
