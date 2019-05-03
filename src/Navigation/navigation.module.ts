import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationRoutingModule } from './navigation-routing.module';
import { NavigationComponent } from './navigation.component';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NavigationRoutingModule,
  ],
  exports: [
    NavigationComponent
  ],
  providers: [],
  bootstrap: [NavigationComponent]
})
export class NavigationModule { }