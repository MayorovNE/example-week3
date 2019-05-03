import { Component, Input, Output, EventEmitter, DoCheck, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from '../sidenav.service';
import { ShoppingCartService } from '../shopping_cart.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SliderService } from '../silder.service';
import { ShopService } from '../Shop.service';

@Component({
  selector: 'Toolbar_sportstore-root',
  templateUrl: './toolbar.component.html',
  inputs: ['countSwitch'],
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements DoCheck {
  public cartCount: number;
  public themeCount: boolean;
  public themeColor: string;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private sidenavService: SidenavService,
    private shoppingcartService: ShoppingCartService,
    private sliderService: SliderService,
    private shopService: ShopService,
    ) {
    this.themeCount = this.sliderService.getColor();
  }
// language change
  switchLanguage(language: string) {
    this.shopService.switchLanguage(language);
  }
// drop admin menu
  dropAdminMenu1(increased: void) {
    this.sidenavService.dropAdminSidenav.emit(increased);
  }
  ngDoCheck() {
    this.cartCount = this.shoppingcartService.getBadge();
    if (this.themeCount === false) {
      this.themeColor = 'warn';
      this.sliderService.swipeColor(false);
    }
    else {
      this.themeColor = 'accent';
      this.sliderService.swipeColor(true);
    }
  }
  openDialogNavigation() {
      const dialogRef = this.dialog.open(DialogNavigationPageComponent, {
      width: '250px',
      });
  }
  openDialogUserPage() {
    const dialogRef = this.dialog.open(DialogUserPageComponent, {
    width: '250px',
    });
  }
  openDialogAdminPage() {
      const dialogRef = this.dialog.open(DialogAdministrationPageComponent, {
      width: '250px',
      });
  }
  openDialogShoppingCartPage() {
    const dialogRef = this.dialog.open(DialogShoppingCartPageComponent, {
    width: '250px',
    });
  }

}

@Component({
  selector: 'dialog-overview-dialog',
  template: `<div mat-dialog-content>
              <div [ngSwitch]="switchText">
                <ng-template ngSwitchCase="0">
                  <span translate>HDialog1</span>
                </ng-template>
              </div>
            </div>
            <div mat-dialog-actions>
              <button mat-button (click)="onNoClick()">{{'NoAnswer' | translate}}</button>
              <div [ngSwitch]="switchText">
                <ng-template ngSwitchCase="0">
                  <button mat-button (click)="backToNavigation()">{{'YesAnswer' | translate}}</button>
                </ng-template>
            </div>`,
})
export class DialogNavigationPageComponent {
  public switchText: number
  constructor(
    public dialogRef: MatDialogRef<DialogNavigationPageComponent>,
    private router: Router,
    ) {
      this.switchText = 0;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  backToNavigation() {
    this.router.navigate(['/navigation']);
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-User-Page',
  template: `<div mat-dialog-content>
              <div [ngSwitch]="switchText">
                <ng-template ngSwitchCase="1">
                  <span translate>HDialog2</span>
                </ng-template>
              </div>
            </div>
            <div mat-dialog-actions>
              <button mat-button (click)="onNoClick()">{{'NoAnswer' | translate}}</button>
              <div [ngSwitch]="switchText">
                <ng-template ngSwitchCase="1">
                  <button mat-button (click)="backToUserPage()">{{'YesAnswer' | translate}}</button>
                </ng-template>
              </div>
            </div>`,
})
export class DialogUserPageComponent {
  public switchText: number;
  constructor(
    public dialogRef: MatDialogRef<DialogUserPageComponent>,
    private router: Router,
    ) {
      this.switchText = 1;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  backToUserPage() {
    this.router.navigate(['/navigation/example5/user_page']);
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-admin-page',
  template: `<div mat-dialog-content>
              <div [ngSwitch]="switchText">
                <ng-template ngSwitchCase="2">
                  <span translate>HDialog3</span>
                </ng-template>
              </div>
            </div>
            <div mat-dialog-actions>
              <button mat-button (click)="onNoClick()">{{'NoAnswer' | translate}}</button>
              <div [ngSwitch]="switchText">
                <ng-template ngSwitchCase="2">
                  <button mat-button (click)="goToAdminPage()">{{'YesAnswer' | translate}}</button>
                </ng-template>
              </div>
            </div>`,
})
export class DialogAdministrationPageComponent {
  public switchText: number;

  constructor(
    public dialogRef: MatDialogRef<DialogAdministrationPageComponent>,
    private router: Router
    ) {
      this.switchText = 2;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  goToAdminPage() {
    this.router.navigate(['/navigation/example5/admin_page']);
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-shopping-cart',
  template: `<div mat-dialog-content>
              <div [ngSwitch]="switchText">
                <ng-template ngSwitchCase="3">
                  <span translate>HDialog4</span>
                </ng-template>
              </div>
            </div>
            <div mat-dialog-actions>
              <button mat-button (click)="onNoClick()">{{'NoAnswer' | translate}}</button>
              <div [ngSwitch]="switchText">
                <ng-template ngSwitchCase="3">
                  <button mat-button (click)="goToShoppingCart()">{{'YesAnswer' | translate}}</button>
                </ng-template>
              </div>
            </div>`,
})
export class DialogShoppingCartPageComponent {
  public switchText: number;

  constructor(
    public dialogRef: MatDialogRef<DialogShoppingCartPageComponent>,
    private router: Router
    ) {
      this.switchText = 3;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  goToShoppingCart() {
    this.router.navigate(['/navigation/example5/user_page/shopping_cart']);
    this.dialogRef.close();
  }
}