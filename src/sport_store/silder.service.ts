import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class SliderService {

  private countColor: boolean;

  constructor() {
    console.log('hi');
    this.countColor = false;
  }
// getting the overall color
  getColor() {
    return this.countColor;
  }
// changing the overall color
  swipeColor(count: boolean) {
    this.countColor = count;
  }
}
