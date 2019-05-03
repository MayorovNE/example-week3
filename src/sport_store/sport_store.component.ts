import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sportstore-root',
  templateUrl: './sport_store.component.html',
  styleUrls: ['./sport_store.component.css'],
})
export class SportStoreComponent {
  constructor(private router: Router,
    private http: HttpClient) {
  }
}
