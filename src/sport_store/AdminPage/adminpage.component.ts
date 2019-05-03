import { Component, ViewChild, ElementRef } from '@angular/core';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'adminpage_sportstore-root',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminPageComponent {
  public addElement: boolean;
  public deleteElement: boolean;
  public opened: boolean;
  public countToToolbar: number;
  public condition: boolean;
  constructor(private sidenavService: SidenavService) {
    this.countToToolbar = 2;
    this.deleteElement = false;
    this.addElement = false;
    this.condition = false;
    this.sidenavService.dropAdminSidenav.subscribe((result: boolean) => {
      if (result === true) {
      this.opened = true;
      }
      else {
        this.opened = false;
      }
    });
  }
// go to the add items page
  goToAddElementPage() {
    this.deleteElement = false;
    this.addElement = true;
  }
// go to the item removal page
  goToDeleteElementPage() {
    this.addElement = false;
    this.deleteElement = true;
  }
  closeAdminMenu(increased: void) {
    this.sidenavService.dropAdminSidenav.emit(increased);
  }
}
