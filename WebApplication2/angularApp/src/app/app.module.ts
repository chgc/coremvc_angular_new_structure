import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DashModule } from './dash/dash.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyComponent } from './empty.component';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [AppComponent, EmptyComponent],
  imports: [BrowserModule, MenuModule, DashModule, AppRoutingModule]
})
export class AppModuleShared {}
