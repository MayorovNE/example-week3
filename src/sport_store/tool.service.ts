import { Injectable, EventEmitter } from '@angular/core';
import { IItem } from './interface.data';

@Injectable()

export class ToolService {

  public locator = (p: IItem, name: string) => p.name === name;

  constructor() {
  }

}
