import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class SidenavService {

  public dropAdminSidenav: EventEmitter<void>;
// admin menu dropdown
  constructor() {
    this.dropAdminSidenav = new EventEmitter<void>();
  }
}
