import { DashModule } from './dash/dash.module';
import { AppRoutingModule } from './app-routing.module';
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmptyComponent } from './empty/empty.component';
import { HomeComponent } from './home/home.component';
import { MenuModule } from './menu/menu.module';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, EmptyComponent],
  imports: [BrowserModule, MenuModule, DashModule, AppRoutingModule]
})
export class AppModuleShared {}
