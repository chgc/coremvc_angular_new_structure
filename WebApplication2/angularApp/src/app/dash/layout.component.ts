import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dash-layout',
  template: `
      <a routerLink="info">info</a>
      <a routerLink="/dash">dash</a>
      <router-outlet></router-outlet>
    `
})
export class DashLayoutComponent {
}
