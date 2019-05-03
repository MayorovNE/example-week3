import {IItem} from '../sport_store/interface.data';
import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ToolService } from './tool.service';
import { RequestOptions } from '@angular/http';

export declare type countTranslate = 'en' | 'rus';

@Injectable()

export class ShopService {
  public serverChangeEmitter: EventEmitter<void>;
  public paginatorLanguageEmitter: EventEmitter<void>;
  private _warehouse: IItem[] = [];
  private _countTranslate: countTranslate;
  private _ArrayOfNumber: number[] = [];

  constructor(
    private translate: TranslateService,
    private toolservice: ToolService,
    private snackBar: MatSnackBar,
    private http: HttpClient) {
    this.serverChangeEmitter = new EventEmitter<void>();
    this.paginatorLanguageEmitter = new EventEmitter<void>();
    this.getServerArray();
    let localLang = JSON.parse(localStorage.getItem('en/ru'));
    if (localLang !== null) {
      translate.setDefaultLang(localLang);
      this._countTranslate = localLang;
    }
    else {
      translate.setDefaultLang('rus');
      this._countTranslate = 'rus';
    }
    }
  getServerArray() {
    this.http.get('http://localhost:3000/warehouse').subscribe((dataServer: IItem[]) => {
      this._warehouse = dataServer;
      for (let i = 0; i < this._warehouse.length; i++) {
        this._ArrayOfNumber[i] = 0;
      }
      this.serverChangeEmitter.emit();
    });
  }
// global language change
  switchLanguage(language: string) {
    if (language === 'rus') {
      this._countTranslate = 'rus';
      this.paginatorLanguageEmitter.emit();
    }
    if (language === 'en') {
      this._countTranslate = 'en';
      console.log(this._countTranslate);
      this.paginatorLanguageEmitter.emit();
    }
    localStorage.setItem('en/ru', JSON.stringify(language));
    this.translate.use(language);
  }
// getting an array from a warehouse
  getData(): IItem[] {
    return this._warehouse;
  }
// getting information about the selected language
  getCountTranslate(): countTranslate {
    return this._countTranslate;
  }
//  adding an element to array of warehouse
  addData(name: string, description: string, category: string, price: number) {
    let helpName = 0;
    let HelpCount: IItem = {name, description, category, price};
    this._warehouse.push(HelpCount);
    this._ArrayOfNumber.push(helpName);
    //let headers = new HttpHeaders({
    //  'Content-Type':  'application/json',
    //});
    //this.http.post('http://localhost:3000/warehouse', JSON.stringify(HelpCount), { headers: headers}).subscribe();
    let message: string;
    if (this._countTranslate === 'rus' ) {
      message = 'Товар был добавлен';
    }
    if (this._countTranslate === 'en' ) {
      message = 'This item has been added';
    }
    let action : string;
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
//  removing an element from array of warehouse
  removeData(name: string) {
    let index = this._warehouse.findIndex(p => this.toolservice.locator(p, name));
    if ( index > -1 ) {
      this._warehouse.splice(index, 1);
      this._ArrayOfNumber.splice(index, 1);
      let message: string;
      if (this._countTranslate === 'rus' ) {
        message = 'Товар был удален';
      }
      if (this._countTranslate === 'en' ) {
        message = 'This item has been deleted';
      }
      let action : string;
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
  }
// getting the initial array of prices
  getArrayForCost(): number[] {
    return this._ArrayOfNumber;
  }
}
