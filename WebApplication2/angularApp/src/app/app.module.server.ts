import { AppComponent } from './app.component';
import { AppModuleShared } from './app.module';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import {
  NgModule,
  ComponentFactoryResolver,
  ApplicationRef,
  Inject
} from '@angular/core';
import { ServerPrebootModule } from 'preboot/server';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    ServerModule,
    AppModuleShared,
    ServerPrebootModule.recordEvents({ appRoot: 'app' })
  ]
})
export class AppModule {
  constructor() {}
}
