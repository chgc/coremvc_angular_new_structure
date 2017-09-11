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
import { UniversalInterceptor } from '../modules/universal-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    ServerModule,
    AppModuleShared,
    ServerPrebootModule.recordEvents({ appRoot: 'app' })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
