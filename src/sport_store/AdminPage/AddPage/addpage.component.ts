import { Component } from '@angular/core';
import { ShopService } from '..//..//Shop.service';
import { IItem } from 'src/sport_store/interface.data';

@Component({
  selector: 'Add_page_sportstore-root',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css'],
})
export class AddPageComponent {
  public inputName: string;
  public inputDescription: string;
  public inputCategory: string;
  public inputPrice: number;
  public item: IItem[];
  constructor(private shopService: ShopService) {
  }
// adding an item to array of warehouse
  addItem(name: string, description: string, category: string, price: number) {
    if (name != null) {
      if (description != null) {
        if (category != null) {
          if (price != null) {
            this.shopService.addData(name, description, category, price);
          }
        }
      }
    }
  }

}
