import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashComponent } from './dash.component';
import { InfoComponent } from './info/info.component';
import { DashLayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'dash',
    component: DashLayoutComponent,
    children: [
      { path: '', component: DashComponent },
      { path: 'info', component: InfoComponent }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule],
  declarations: [DashComponent, InfoComponent, DashLayoutComponent]
})
export class DashModule {}
