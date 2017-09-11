import { AppModuleShared } from './app.module';
import { BrowserModule } from '@angular/platform-browser';
import { ORIGIN_URL, REQUEST } from '@nguniversal/aspnetcore-engine';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  NgModule
} from '@angular/core';
import { BrowserPrebootModule } from 'preboot/browser';
import { entryComponents } from './entryComponents';

export function getOriginUrl() {
  return window.location.origin;
}

export function getRequest() {
  // the Request object only lives on the server
  return { cookie: document.cookie };
}

@NgModule({
  entryComponents: [...entryComponents],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    BrowserPrebootModule.replayEvents(),
    AppModuleShared
  ],
  providers: [
    {
      // We need this for our Http calls since they'll be using an ORIGIN_URL provided in main.server
      // (Also remember the Server requires Absolute URLs)
      provide: ORIGIN_URL,
      useFactory: getOriginUrl
    },
    {
      // The server provides these in main.server
      provide: REQUEST,
      useFactory: getRequest
    }
  ]
})
export class AppModule {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngDoBootstrap(app: ApplicationRef) {
    entryComponents.forEach((component: any) => {
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        component
      );
      if (document.querySelector(factory.selector)) {
        app.bootstrap(factory.componentType);
      }
    });
  }
}
