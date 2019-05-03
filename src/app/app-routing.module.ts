import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from 'src/navigation/navigation.component';
import { SportStoreComponent } from 'src/sport_store/sport_store.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/navigation',
    pathMatch: 'full'
  },
  {
    path: 'navigation',
    component: NavigationComponent,
    children: [
      {
        path: 'example5',
        redirectTo: 'user_page',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [ BrowserModule, RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

