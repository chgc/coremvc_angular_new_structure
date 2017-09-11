import { AppModuleShared } from './app.module';
import { BrowserModule } from '@angular/platform-browser';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  NgModule
} from '@angular/core';
import { BrowserPrebootModule } from 'preboot/browser';
import { entryComponents } from './entryComponents';

@NgModule({
  entryComponents: [...entryComponents],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id' // make sure this matches with your Server NgModule
    }),
    BrowserPrebootModule.replayEvents(),
    AppModuleShared
  ],
  providers: []
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
