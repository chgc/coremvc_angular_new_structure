import { AppModuleShared } from './app.module';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import {
  NgModule,
  ComponentFactoryResolver,
  ApplicationRef
} from '@angular/core';
import { entryComponents } from './entryComponents';
import { ServerPrebootModule } from 'preboot/server';

@NgModule({
  entryComponents: [...entryComponents],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id' // make sure this matches with your Browser NgModule
    }),
    ServerModule,
    ServerPrebootModule.recordEvents({ appRoot: 'app' }),
    AppModuleShared
  ]
})
export class AppModule {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngDoBootstrap(app: ApplicationRef) {
    // entryComponents.forEach((component: any) => {
    //   const factory = this.componentFactoryResolver.resolveComponentFactory(
    //     component
    //   );
    //   if (document.querySelector(factory.selector)) {
    //     app.bootstrap(factory.componentType);
    //   }
    // });
  }
}
